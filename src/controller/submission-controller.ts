import amqpChannel, {
	submissionQueue,
	rpcQueue,
	connection,
} from "../configs/amqp.js";

// Types
import {
	Submission,
	JudgeJob,
	JobResult,
} from "./types/submission-controller.types.js";

// Models
import SampleTest from "../models/sample-test-model.js";
import HiddenTest from "../models/hidden-test-model.js";
import Problem from "../models/problem-model.js";
import SubmissionModel from "../models/submission-model.js";
SampleTest;
HiddenTest;

//Utils
import {
	langExtension,
	isCompiled,
} from "./utils/submission-controller.utils.js";
import crypto from "crypto";

const getMySubmissions = async (req, res) => {
	const user_id = req.user._id;
	const { problem_id, startingRow, count, sortBy } = req.query;

	const submissionsQuery = {
		user_id: user_id,
		problem_id: problem_id,
	};
	try {
		const submissionsPromise: Promise<any> = SubmissionModel.find(
			submissionsQuery,
			{},
			{ skip: startingRow, limit: count }
		)
			.select("-_id -__v -user_id -problem_id -source_code")
			.sort({
				submission_time: sortBy,
			});

		const totalSubmissionsPromise =
			SubmissionModel.countDocuments(submissionsQuery);

		const [submissions, totalSubmissions] = await Promise.all([
			submissionsPromise,
			totalSubmissionsPromise,
		]);

		return res.status(200).json({ submissions, totalSubmissions });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const submitProblem = async (req, res) => {
	const submission: Submission = req.body;
	submission.submission_time = new Date();
	submission.id = crypto
		.createHash("sha256")
		.update(submission.submission_time + submission.user_id)
		.digest("hex");

	const problem = await Problem.findOne({ _id: submission.problem_id })
		.populate("sample_tests", "test_input test_output")
		.populate(
			"hidden_tests",
			"input_file_path output_file_path time_lim mem_lim"
		)
		.select("slug time_lim mem_lim sample_tests hidden_tests");

	if (!problem) {
		//TODO: Check if submission is within time limit if the problem is from a live contest
		// ? A different API for this perhaps? (contest submissions)
		return res.status(404).json({ message: "Problem not found" });
	}

	submission.lang.extension = langExtension(submission.lang.name);
	submission.lang.is_compiled = isCompiled(submission.lang.name);

	const judge_job: JudgeJob = {
		problem_data: {
			slug: problem.slug,
			time_lim: problem.time_lim,
			mem_lim: problem.mem_lim,
			lang: submission.lang,
			sample_tests: problem.sample_tests,
			hidden_tests: problem.hidden_tests,
		},
		submission_data: {
			id: submission.id,
			user_id: req.user._id,
			source_code: submission.source_code,
			problem_id: submission.problem_id,
			submission_time: submission.submission_time,
		},
	};

	amqpChannel.sendToQueue(
		submissionQueue,
		Buffer.from(JSON.stringify(judge_job)),
		{
			replyTo: rpcQueue,
			correlationId: submission.id,
		}
	);

	let result: JobResult = null;
	amqpChannel.consume(
		rpcQueue,
		async (msg) => {
			if (msg.properties.correlationId !== submission.id) return;
			result = JSON.parse(msg.content.toString());

			SubmissionModel.create({
				problem_id: submission.problem_id,
				user_id: req.user._id,
				submission_id: submission.id,
				lang: submission.lang.name,
				code: submission.source_code,
				submission_time: submission.submission_time,
				verdict: result?.verdict || "Judging Unsuccessful",
				cpu_time: result?.cpu_time || 0,
				memory: result?.memory || 0,
				code_size: Buffer.byteLength(submission.source_code, "utf8"),
			});

			res.status(200).json({
				message: "Judging successful",
				submission_time: submission.submission_time,
				submission_id: submission.id,
				lang: submission.lang.name,
				code_size: Buffer.byteLength(submission.source_code, "utf8"),
				result: result,
			});
			//Stop listening
			amqpChannel.cancel(msg.fields.consumerTag);
		},
		{ noAck: true }
	);
};

export { submitProblem, getMySubmissions };

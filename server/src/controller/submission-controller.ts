import Problem from "../models/problem-model.js";
import SubmissionModel from "../models/submission-model.js";

import JudgeQueue from "../microservices/judge/judge-queue.js";

// Types
import {
	Submission,
	JudgeJob,
	JobResult,
} from "./types/submission-controller.types.js";

// Models
import SampleTest from "../models/sample-test-model.js";
import HiddenTest from "../models/hidden-test-model.js";
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
		const submissions = await SubmissionModel.find(
			submissionsQuery,
			{},
			{ skip: startingRow, limit: count }
		)
			.select("-_id -__v -user_id -problem_id -source_code")
			.sort({
				submission_time: sortBy,
			});

		const totalSubmissions = await SubmissionModel.countDocuments(
			submissionsQuery
		);

		return res.status(200).json({ submissions, totalSubmissions });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

const submitProblem = async (req, res) => {
	const submission: Submission = req.body;
	submission.submission_time = new Date();
	submission.id = crypto.randomInt(10000, 99999).toString();

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
		problemData: {
			slug: problem.slug,
			time_lim: problem.time_lim,
			mem_lim: problem.mem_lim,
			source_code: submission.source_code,
			lang: submission.lang,
			sample_tests: problem.sample_tests,
			hidden_tests: problem.hidden_tests,
		},
		submissionData: {
			id: submission.id,
			user_id: req.user._id,
			problem_id: submission.problem_id,
			submission_time: submission.submission_time,
		},
	};

	const job = await JudgeQueue.add(judge_job);
	let result: JobResult;
	try {
		result = await job.finished();
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err.message,
		});
	}

	res.status(200).json({
		message: "Judging successful",
		submission_time: submission.submission_time,
		results: result,
	});
};

export { submitProblem, getMySubmissions };

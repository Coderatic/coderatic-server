import Queue from "bull";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

//Models
import SubmissionModel from "../../models/submission-model.js";

//Types
import { JudgeJob } from "../../controller/types/submission-controller.types.js";
import { TestResult, JobResult } from "./judge-queue.types.js";

// Utils
import {
	startJudging,
	cleanup,
	runCommand,
	escapeSrc,
	aggregateResults,
} from "./utils.js";

// Envs
import {
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
} from "../../configs/runtime-envs.config.js";

// Directory config
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//CONSTANTS
const CWD = __dirname;
const JUDGE_WD = path.join(CWD, "controller-scripts");

const JudgeQueue = new Queue<JudgeJob>("judge", {
	redis: {
		host: REDIS_HOST,
		port: REDIS_PORT,
		password: REDIS_PASSWORD,
	},
});

JudgeQueue.process(async (job): Promise<JobResult> => {
	const { source_code, lang, sample_tests, hidden_tests } =
		job.data.problemData;
	const file_name = uuidv4();

	const exec_path = path.join(CWD, `cache/code/${file_name}`);
	const src_path = exec_path + `.${lang.extension}`;

	//Save escaped source code to file
	const escaped_src = escapeSrc(source_code);
	fs.writeFileSync(src_path, escaped_src, { flag: "w" });

	let result: JobResult = {
		verdict: "AC",
		cpu_time: 0,
		memory: 0,
		hidden_tests_results: [],
		sample_tests_results: [],
	};
	//Compile the program (if required)
	if (lang.is_compiled) {
		const compile_script = `./compile.sh "${lang.name}" ${file_name}`;
		try {
			await runCommand(compile_script, JUDGE_WD);
		} catch (err) {
			cleanup([src_path]);
			result.verdict = err.exitCode == 1 ? "CE" : "IE";
		}
	}
	//@ts-ignore
	if (result?.verdict !== "CE" && result?.verdict !== "IE") {
		const sample_testPromise: Promise<TestResult[]> = startJudging(
			file_name,
			sample_tests,
			job.data,
			"sample"
		);
		const hidden_testPromise: Promise<TestResult[]> = startJudging(
			file_name,
			hidden_tests,
			job.data,
			"hidden"
		);
		const [sample_test_results, hidden_test_results] = await Promise.all([
			sample_testPromise,
			hidden_testPromise,
		]);
		cleanup([src_path]);
		//@ts-ignore
		lang.is_compiled && result?.verdict !== "CE"
			? cleanup([exec_path])
			: null;

		result = {
			...aggregateResults(sample_test_results, hidden_test_results),
			sample_tests_results: sample_test_results,
			hidden_tests_results: hidden_test_results,
		};
	}

	// Save submission to db but don't await (le trolling the user on failed save)
	const submissionData = job.data.submissionData;
	new SubmissionModel({
		problem_id: submissionData.problem_id,
		user_id: submissionData.user_id,
		submission_id: submissionData.id,
		code: escaped_src,
		lang: lang.name,
		submission_time: submissionData.submission_time,
		verdict: result.verdict,
		cpu_time: result.cpu_time,
		memory: result.memory,
		code_size: Buffer.byteLength(source_code, "utf8"),
	}).save();
	return result;
});

export default JudgeQueue;

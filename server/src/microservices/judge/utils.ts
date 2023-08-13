import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

//Types
import { TestResult, Verdict } from "./judge-queue.types.js";
import { JudgeJob } from "../../controller/types/submission-controller.types.js";

//Directory config
import { fileURLToPath } from "url";
import { dirname } from "path";
import { check } from "express-validator";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const CWD = __dirname;
const JUDGE_WD = path.join(CWD, "controller-scripts");

const handle_exit_code = (exit_code: Number): Verdict => {
	switch (exit_code) {
		case 0:
			return "Accepted";
		case 2:
			return "Wrong Answer";
		case 5:
			return "IE";
		case 137:
			return "TLE";
		case 139:
			return "MLE";
		default:
			//TODO: Remove this log before hitting production.
			console.log("Unknown exit code: ", exit_code);
			return "RE";
	}
};

const escapeSrc = (source_code: string): string => {
	return source_code.replace(/[\n\t\r\\"]/g, (match) => `${match}`);
};

const cleanup = async (file_paths: string[]) => {
	for (let i = 0; i < file_paths.length; i++) {
		const file_path = file_paths[i];
		if (file_path) {
			fs.unlink(file_path, (err) => {
				if (err) console.log(err);
			});
		}
	}
};

const runCommand = (command: string, workingDir: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const process = exec(
			command,
			{ cwd: workingDir },
			(error, stdout, stderr) => {
				if (error) {
					reject(process);
				} else {
					resolve({ process, stdout, stderr });
				}
			}
		);
	});
};

const createTestDirectories = async (directoryPath: string) => {
	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(`${directoryPath}/input/`, { recursive: true });
		fs.mkdirSync(`${directoryPath}/output/`, { recursive: true });
	}
};

const createTestFiles = async (
	input_filename: string,
	output_filename: string,
	raw_input: string,
	raw_output: string,
	directoryPath: string
) => {
	fs.writeFileSync(`${directoryPath}/input/${input_filename}`, raw_input, {
		flag: "w",
	});
	fs.writeFileSync(`${directoryPath}/output/${output_filename}`, raw_output, {
		flag: "w",
	});
};

const startJudging = async (
	file_name: string,
	testCases: any[],
	job_data: JudgeJob,
	testType: string
): Promise<TestResult[]> => {
	const verdicts: TestResult[] = [];
	const { slug, lang, time_lim, mem_lim } = job_data.problemData;
	for (let i = 0; i < testCases.length; i++) {
		const tc = testCases[i];
		let input_filename = tc?.input_file_path;
		let output_filename = tc?.output_file_path;
		if (testType == "sample") {
			const testsDirectoryPath = path.join(
				CWD,
				`./cache/test_sets/${slug}`
			);
			await createTestDirectories(testsDirectoryPath);
			input_filename = `sample-${i + 1}.in`;
			output_filename = `sample-${i + 1}.out`;
			await createTestFiles(
				input_filename,
				output_filename,
				tc.test_input,
				tc.test_output,
				testsDirectoryPath
			);
		}
		const judge_script = `./judge.sh ${slug} ${file_name} ${
			lang.extension
		} ${input_filename} ${output_filename} ${
			Number(tc.mem_lim ?? mem_lim) * 1024
		} ${tc.time_lim ?? time_lim}`;

		let tcResult: TestResult = {
			verdict: "IE",
		};
		try {
			const judge_script_result = await runCommand(
				judge_script,
				JUDGE_WD
			);
			const judge_output = JSON.parse(
				judge_script_result.stdout as string
			);

			// TODO: Refactor this
			//Convert strings entries to numbers
			const {
				cpu_time: cpu_time,
				memory: memory,
				program_exit_code: programExitCode,
				checker_exit_code: checkerExitCode,
			} = judge_output;

			const integerJudgeOutputEntries = {
				cpu_time: parseInt(cpu_time),
				memory: parseInt(memory),
				program_exit_code: parseInt(programExitCode),
				checker_exit_code: parseInt(checkerExitCode),
			};

			if (integerJudgeOutputEntries.program_exit_code != 0) {
				throw "Runtime Error";
			}
			const verdict = judge_output.checker_output.verdict;
			tcResult = { ...tcResult, verdict, cpu_time, memory };
		} catch (err) {
			if (err === "Runtime Error") {
				tcResult.verdict = "RE";
			} else {
				console.log("Judge Error: ", err);
				tcResult.verdict = "IE";
			}
		} finally {
			verdicts.push(tcResult);
			if (tcResult.verdict !== "Accepted") break;
		}
	}
	return verdicts;
};

const aggregateResults = (
	sample_test_results: TestResult[],
	hidden_test_results: TestResult[]
): { verdict: Verdict; cpu_time: number; memory: number } => {
	const allTestResults = [...sample_test_results, ...hidden_test_results];
	let final_verdict = allTestResults.at(-1).verdict;
	let max_cpu_time = 0;
	let peak_memory = 0;
	for (let i = 0; i < allTestResults.length; i++) {
		max_cpu_time = Math.max(max_cpu_time, allTestResults[i].cpu_time);
		peak_memory = Math.max(peak_memory, allTestResults[i].memory);
	}
	max_cpu_time /= allTestResults.length;
	return {
		verdict: final_verdict,
		cpu_time: max_cpu_time,
		memory: peak_memory,
	};
};

export {
	startJudging,
	cleanup,
	handle_exit_code,
	runCommand,
	escapeSrc,
	aggregateResults,
};

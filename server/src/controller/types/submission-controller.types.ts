import { TestResult } from "../../microservices/judge/judge-queue.types.js";

type Submission = {
	id: string;
	problem_id: string;
	user_id: string;
	submission_time?: Date;
	source_code: string;
	lang: {
		name: string;
		extension: string;
		is_compiled: boolean;
	};
};

type JudgeJob = {
	problemData: {
		slug: string;
		time_lim: number;
		mem_lim: number;
		source_code: string;
		lang: {
			name: string;
			extension: string;
			is_compiled: boolean;
		};
		sample_tests: [];
		hidden_tests: [];
	};
	submissionData: {
		id: string;
		user_id: string;
		problem_id: string;
		submission_time: Date;
	};
};

type JobResult = {
	verdict: string;
	cpu_time: number;
	memory: number;
	sample_tests_results?: TestResult[];
	hidden_tests_results: TestResult[];
};

export type { Submission, JudgeJob, JobResult };

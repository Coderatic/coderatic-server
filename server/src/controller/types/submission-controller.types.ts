import {
	TestResult,
	Verdict,
} from "../../microservices/judge/judge-queue.types.js";

type Submission = {
	id: string;
	problem_id: string;
	user_id: string;
	submission_time?: Date;
	source_code: string;
	lang: {
		name: string;
		extension?: string;
		is_compiled?: boolean;
	};
};

type JudgeJob = {
	problem_data: {
		slug: string;
		time_lim: number;
		mem_lim: number;
		lang: {
			name: string;
			extension?: string;
			is_compiled?: boolean;
		};
		sample_tests: [];
		hidden_tests: [];
	};
	submission_data: {
		id: string;
		user_id: string;
		problem_id: string;
		source_code: string;
		submission_time: Date;
	};
};

type JobResult = {
	verdict: Verdict;
	cpu_time: number;
	memory: number;
	sample_test_results?: TestResult[];
	hidden_test_results: TestResult[];
};

export type { Submission, JudgeJob, JobResult };

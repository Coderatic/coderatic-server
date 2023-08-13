import { JobResult } from "../../controller/types/submission-controller.types.js";

type Verdict = "Accepted" | "Wrong Answer" | "TLE" | "MLE" | "RE" | "IE";

type TestResult = {
	verdict: Verdict;
	cpu_time?: number;
	memory?: number;
};

export { Verdict };
export type { TestResult, JobResult };

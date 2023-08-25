import { JobResult } from "../../controller/types/submission-controller.types.js";

type Verdict = "CE" | "AC" | "WA" | "TLE" | "MLE" | "RE" | "IE" | "PE";

type TestResult = {
	verdict: Verdict;
	cpu_time?: number;
	memory?: number;
};

export { Verdict };
export type { TestResult, JobResult };

import { verdict } from "../../microservices/judge/judge-queue.types.js";
import ISampleTest from "../../models/sample-test-model.js";
import IHiddenTest from "../../models/hidden-test-model.js";

type Submission = {
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
  problem_id: string;
  source_code: string;
  file_name: string;
  lang: {
    name: string;
    extension: string;
    is_compiled: boolean;
  };
  sample_test_cases: any[];
  hidden_test_cases: any[];
};

type JobResponse = {
  sample_case_verdicts: verdict[];
  hidden_case_verdicts: verdict[];
};

export type { Submission, JudgeJob, JobResponse };

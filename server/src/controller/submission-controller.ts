import Problem from "../models/problem-model.js";
import TestSet from "../models/test-set-model.js";
import SampleSet from "../models/sample-set-model.js";
import shortId from "shortid";

import JudgeQueue, { JudgeJob } from "../microservices/judge/judge-queue.js";

type Submission = {
  problem_id: string;
  user_id: string;
  submission_time?: number;
  source_code: string;
  lang: {
    name: string;
    extension?: string;
    is_compiled?: boolean;
  };
};

const submitProblem = async (req, res): Promise<Express.Response> => {
  const submission: Submission = req.body;
  submission.submission_time = new Date().valueOf();

  //Get the user for the submission
  //const user = await User.findOne({ short_id: submission.user_id });
  //if (!user) return res.status(404).json({ message: "User not found" });

  //Get the problem for the submission
  const problem = await Problem.findOne({ short_id: submission.problem_id });
  if (problem) {
    // TODO: Check if submission is within time limit
  } else return res.status(404).json({ message: "Problem not found" });

  //Assign extension according to language name from a key-value pair
  const lang = submission.lang.name;
  const lang_ext = {
    c: "c",
    cpp: "cpp",
    csharp: "cs",
    dart: "dart",
    golang: "go",
    haskell: "hs",
    java: "java",
    javascript: "js",
    julia: "jl",
    kotlin: "kt",
    lisp: "el",
    lua: "lua",
    octave: "m",
    perl: "pl",
    php: "php",
    py3: "py",
    python: "py",
    R: "r",
    ruby: "rb",
    rust: "rs",
    scala: "scala",
    typescript: "ts",
  };
  submission.lang.extension = lang_ext[lang];

  //Assign is_compiled according to language name if it's in the list
  const compiled_langs = ["c", "cpp", "java", "rust"];
  submission.lang.is_compiled = compiled_langs.includes(lang);

  const judge_job: JudgeJob = {
    problem_id: problem.short_id,
    source_code: submission.source_code,
    file_name: shortId.generate(),
    lang: submission.lang,
    test_set: await TestSet.find({ problem_id: problem._id }),
  };

  const job = await JudgeQueue.add(judge_job);
  let verdicts: string[];
  try {
    verdicts = await job.finished();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(200).json({
    message: "Submission successful",
    submission_time: submission.submission_time,
    verdicts: verdicts,
  });
};

export { submitProblem };

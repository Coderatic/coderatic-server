import Problem from "../models/problem-model.js";
import HiddenTest from "../models/hidden-test-model.js";
import SampleTest from "../models/sample-test-model.js";
import { v4 as uuidv4 } from "uuid";

import JudgeQueue from "../microservices/judge/judge-queue.js";

// Types
import {
  Submission,
  JudgeJob,
  JobResponse,
} from "./types/submission-controller.types.js";

const submitProblem = async (req, res): Promise<Express.Response> => {
  const submission: Submission = req.body;
  submission.submission_time = new Date();

  const problem = await Problem.findOne({ short_id: submission.problem_id });
  if (problem) {
    // TODO: Check if submission is within time limit if the problem is from a live contest (Probably a different API for contest submissions)
  } else return res.status(404).json({ message: "Problem not found" });

  const lang = submission.lang.name;

  //Determine the src extension
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

  //Determine if the language is compiled or not
  const compiled_langs = ["c", "cpp", "rust", "golang"];
  submission.lang.is_compiled = compiled_langs.includes(lang);

  const judge_job: JudgeJob = {
    problem_id: problem.short_id,
    source_code: submission.source_code,
    file_name: uuidv4.generate(),
    lang: submission.lang,
    sample_test_cases: await HiddenTest.find({
      problem_id: problem._id,
    }).select("-_id -problem_id -__v"),
    hidden_test_cases: await SampleTest.find({
      problem_id: problem._id,
    }).select("-_id -problem_id -__v"),
  };

  const job = await JudgeQueue.add(judge_job);
  let verdicts: JobResponse;
  try {
    verdicts = await job.finished();
  } catch (err) {
    console.log(err);
    job.moveToFailed(err);
    return res.status(400).json({
      message: err.message,
    });
  }
  job.remove();

  res.status(200).json({
    message: "Submission successful",
    submission_time: submission.submission_time,
    verdicts: verdicts,
  });
};

export { submitProblem };

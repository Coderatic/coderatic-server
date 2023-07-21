import Queue from "bull";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

//Types
import { JudgeJob } from "../../controller/types/submission-controller.types.js";
import { verdict } from "./judge-queue.types.js";

// Utils
import { startJudging, cleanup, runCommand, escapeSrc } from "./utils.js";

// File system config
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const JudgeQueue = new Queue<JudgeJob>("judge", {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    tls: {
      servername: process.env.REDIS_HOST,
      rejectUnauthorized: false,
    },
  },
});

JudgeQueue.process(async (job): Promise<Object> => {
  const { source_code, lang, sample_test_cases, hidden_test_cases, file_name } =
    job.data;
  const src_type = lang.is_compiled ? "compiled" : "interpreted";
  const exec_type = lang.is_compiled ? "bins" : "scripts";

  const src_path = path.join(
    __dirname,
    `cache/src/${src_type}/${file_name}.${lang.extension}`
  );

  const exec_path = path.join(
    __dirname,
    `cache/processed/${exec_type}/${file_name}${
      lang.is_compiled ? "" : "." + lang.extension
    }`
  );

  const workingDir = path.join(__dirname, "controller-scripts");

  const escaped_src = escapeSrc(source_code);

  //Save source code to file
  fs.writeFileSync(src_path, escaped_src, { flag: "w" });

  //Compile the program
  const compile_script = `./compile.sh ${lang.name} ${file_name}`;

  try {
    await runCommand(compile_script, workingDir);
  } catch (err) {
    cleanup([src_path]);
    if (err.exitCode === 1) {
      return [
        {
          judge_verdict: "CE",
          test_case_type: "sample",
        },
      ];
    }
    return [
      {
        judge_verdict: "IE",
        test_case_type: "sample",
      },
    ];
  }

  const sample_case_verdicts: verdict[] = await startJudging(
    workingDir,
    sample_test_cases,
    job.data,
    true
  );
  const hidden_case_verdicts: verdict[] = await startJudging(
    workingDir,
    hidden_test_cases,
    job.data,
    false
  );
  cleanup([src_path, exec_path]);

  return {
    sample_case_verdicts: sample_case_verdicts,
    hidden_case_verdicts: hidden_case_verdicts,
  };
});

export default JudgeQueue;

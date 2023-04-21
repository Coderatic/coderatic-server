import Queue from "bull";
import fs from "fs";
import path from "path";
import shortId from "shortid";
import { exec } from "child_process";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

type JudgeJob = {
  problem_id: string;
  source_code: string;
  file_name: string;
  lang: {
    name: string;
    extension?: string;
    is_compiled?: boolean;
  };
  test_set?: any[];
};

const JudgeQueue = new Queue<JudgeJob>("judge", {
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
  },
});

function handle_exit_code(exit_code: string): string {
  switch (parseInt(exit_code)) {
    case 0:
      return "AC";
    case 1:
      return "CE";
    case 2:
      return "WA";
    case 124:
      return "TLE";
    case 137:
      return "MLE";
    case 5:
      return "IE";
    default:
      console.log("Unknown exit code: ", exit_code);
      return "RE";
  }
}

function runCommand(command, workingDir): Promise<any> {
  return new Promise((resolve, reject) => {
    const process = exec(
      command,
      { cwd: workingDir },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(process);
        } else {
          resolve({ process, stdout, stderr });
        }
      }
    );
  });
}

JudgeQueue.process(async (job): Promise<string[]> => {
  const { problem_id, source_code, lang, test_set, file_name } = job.data;
  const src_type = lang.is_compiled ? "compiled" : "interpreted";
  const file_path = path.join(
    __dirname,
    `cache/src/${src_type}/${file_name}.${lang.extension}`
  );
  const workingDir = path.join(__dirname, "controller-scripts");
  //Save source code to file
  //Escape \n, \t, \ and \r
  const escaped_source_code = source_code.replace(/[\\n\\t\\r\\]/g, (match) => {
    switch (match) {
      case "\\n":
        return "\\n";
      case "\\t":
        return "\\t";
      case "\\r":
        return "\\r";
      case "\\\\":
        return "\\\\";
      case '"':
        return '\\"';
      default:
        return match;
    }
  });
  fs.writeFileSync(file_path, escaped_source_code, { flag: "w" });

  //Compile the program
  const compile_script = `./compile.sh ${lang.name} ${file_name}`;
  let result: { stdout: string; stderr: string };

  try {
    result = await runCommand(compile_script, workingDir);
  } catch (err) {
    if (err.exitCode === 1) {
      return ["CE"];
    }
    return ["IE"];
  }

  //Judge for each test case
  const verdicts: string[] = [];
  for (let i = 0; i < test_set.length; i++) {
    const tc = test_set[i];
    const judge_script = `./judge.sh ${problem_id} ${file_name} ${lang.extension} ${tc.input_file} ${tc.output_file} ${tc.mem_lim} ${tc.time_lim}`;

    let result: { stdout: string; stderr: string };
    try {
      result = await runCommand(judge_script, workingDir);
      const verdict: string = handle_exit_code(result.stdout);
      console.log("Verdict: ", verdict);
      verdicts.push(verdict);
    } catch (err) {
      if (err.exitCode !== undefined) {
        verdicts.push(handle_exit_code(err.exitCode));
        console.log("Verdict: ", handle_exit_code(err.exitCode));
      } else verdicts.push("IE");
    }
  }
  fs.unlink(file_path, (err) => {
    if (err) console.log(err);
  });
  return verdicts;
});

export default JudgeQueue;
export type { JudgeJob };

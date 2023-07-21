import fs from "fs";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

//Types
import { verdict } from "./judge-queue.types.js";
import { JudgeJob } from "../../controller/types/submission-controller.types.js";

const handle_exit_code = (exit_code: Number): string => {
  switch (exit_code) {
    case 0:
      return "AC";
    case 1:
      return "CE";
    case 2:
      return "WA";
    case 5:
      return "IE";
    case 137:
      return "TLE";
    case 139:
      return "MLE";
    default:
      console.log("Unknown exit code: ", exit_code);
      return "RE";
  }
};

const escapeSrc = (source_code: string): string => {
  source_code.replace(/[\\n\\t\\r\\]/g, (match) => {
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
  return source_code;
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

const runCommand = async (
  command: string,
  workingDir: string
): Promise<any> => {
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

const createTestFiles = async (raw_input: string, raw_output: string) => {
  const input_file = uuidv4() + ".txt";
  const output_file = uuidv4() + ".txt";
  fs.writeFileSync(input_file, raw_input, { flag: "w" });
  fs.writeFileSync(output_file, raw_output, { flag: "w" });
  return { input_file, output_file };
};

const startJudging = async (
  workingDir: string,
  testCases: any[],
  job_data: JudgeJob,
  testIsRaw: boolean
): Promise<verdict[]> => {
  const verdicts: verdict[] = [];
  const { problem_id, lang, file_name } = job_data;
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    let input_file_path = "";
    let output_file_path = "";
    if (testIsRaw) {
      const { input_file, output_file } = await createTestFiles(
        tc.test_input,
        tc.test_output
      );
      input_file_path = input_file;
      output_file_path = output_file;
    }
    const judge_script = `./judge.sh ${problem_id} ${file_name} ${
      lang.extension
    } ${input_file_path} ${output_file_path} ${Number(tc.mem_lim) * 1024} ${
      tc.time_lim
    }`;

    const verd: verdict = {
      judge_verdict: "IE",
      test_case_type: "hidden",
    };
    try {
      const result = await runCommand(judge_script, workingDir);
      verd.judge_verdict = handle_exit_code(result.stdout);
    } catch (err) {
      if (err.exitCode !== undefined) {
        verd.judge_verdict = handle_exit_code(Number(err.exitCode));
      }
    } finally {
      verdicts.push(verd);
      cleanup([input_file_path, output_file_path]);
    }
  }
  return verdicts;
};

export { startJudging, cleanup, handle_exit_code, runCommand, escapeSrc };

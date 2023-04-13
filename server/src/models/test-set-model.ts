import mongoose, { Document } from "mongoose";
import shortId from "shortid";
import Problem, { IProblem } from "./problem-model.js";

interface ITestSet extends Document {
  problem_id: mongoose.Schema.Types.ObjectId;
  input_file: string;
  output_file: string;
  time_lim: number;
  mem_lim: number;
}

const TestSetSchema = new mongoose.Schema<ITestSet>(
  {
    problem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    } as IProblem["_id"],
    input_file: {
      type: String,
      default: shortId.generate + ".txt",
    },
    output_file: {
      type: String,
      default: shortId.generate + ".txt",
    },
    time_lim: {
      type: Number,
      required: true,
    },
    mem_lim: {
      type: Number,
      required: true,
    },
  },
  { collection: "test sets" }
);

export default mongoose.model<ITestSet>("TestSet", TestSetSchema);
export { ITestSet };

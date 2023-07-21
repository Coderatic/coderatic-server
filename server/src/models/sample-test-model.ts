import mongoose, { Document } from "mongoose";
import { IProblem } from "./problem-model.js";

interface ISampleTest extends Document {
  problem_id: mongoose.Schema.Types.ObjectId;
  test_input: string;
  test_output: string;
  explanation?: string;
  time_lim: number;
  mem_lim: number;
}

const HiddenTestSchema = new mongoose.Schema<ISampleTest>(
  {
    problem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    } as IProblem["_id"],
    test_input: {
      type: String,
      required: true,
    },
    test_output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: false,
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
  { collection: "sampleTest" }
);

export default mongoose.model<ISampleTest>("SampleTest", HiddenTestSchema);
export { ISampleTest };

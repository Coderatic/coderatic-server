import mongoose, { Document, ObjectId } from "mongoose";
import { ITestSet } from "./test-set-model.js";
import shortId from "shortid";

interface IProblem extends Document {
  name: string;
  short_id: string;
  description: string;
  input_format: string;
  output_format: string;
  sample_test_sets: ITestSet["_id"];
  hidden_test_sets: ITestSet["_id"];
}

const ProblemSchema = new mongoose.Schema<IProblem>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    short_id: {
      type: String,
      unique: true,
      default: shortId.generate,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    input_format: {
      type: String,
      trim: true,
      required: true,
    },
    output_format: {
      type: String,
      trim: true,
      required: true,
    },
    sample_test_sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestSet",
      } as ITestSet["_id"],
    ],
    hidden_test_sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestSet",
      } as ITestSet["_id"],
    ],
  },
  { collection: "problem", timestamps: true }
);

export default mongoose.model<IProblem>("Problem", ProblemSchema);
export { IProblem };

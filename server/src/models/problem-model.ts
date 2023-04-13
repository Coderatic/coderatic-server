import mongoose, { Document, ObjectId } from "mongoose";
import { ITestSet } from "./test-set-model.js";
import shortId from "shortid";

interface IProblem extends Document {
  name: string;
  short_id: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  test_sets: ITestSet["_id"];
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
    inputFormat: {
      type: String,
      trim: true,
      required: true,
    },
    outputFormat: {
      type: String,
      trim: true,
      required: true,
    },
    constraints: {
      type: String,
      trim: true,
      required: true,
    },
    test_sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestSet",
      } as ITestSet["_id"],
    ],
  },
  { collection: "problems", timestamps: true }
);

export default mongoose.model<IProblem>("Problem", ProblemSchema);
export { IProblem };

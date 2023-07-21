import mongoose, { Document } from "mongoose";
import { IHiddenTest } from "./hidden-test-model.js";
import { ISampleTest } from "./sample-test-model.js";
import shortId from "shortid";

interface IProblem extends Document {
  name: string;
  short_id: string;
  statement: string;
  input_format: string;
  output_format: string;
  sample_test_sets?: ISampleTest["_id"];
  hidden_test_sets?: IHiddenTest["_id"];
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
      index: true,
      default: shortId.generate,
    },
    statement: {
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
        required: false,
      } as ISampleTest["_id"],
    ],
    hidden_test_sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestSet",
      } as IHiddenTest["_id"],
    ],
  },
  { collection: "problem", timestamps: true }
);

export default mongoose.model<IProblem>("Problem", ProblemSchema);
export { IProblem };

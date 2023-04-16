import mongoose, { Document } from "mongoose";
import shortId from "shortid";
import { IProblem } from "./problem-model.js";

interface ISampleSet extends Document {
  problem_id: mongoose.Schema.Types.ObjectId;
  input: string;
  output: string;
  description: string;
}

const SampleSetSchema = new mongoose.Schema<ISampleSet>(
  {
    problem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    } as IProblem["_id"],
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { collection: "sample_set" }
);

export default mongoose.model<ISampleSet>("SampleSet", SampleSetSchema);
export { ISampleSet };

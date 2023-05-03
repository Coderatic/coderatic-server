import mongoose, { Document } from "mongoose";
import { ITestSet } from "./test-set-model.js";
import shortId from "shortid";

interface IContest extends Document {
  name: string;
  short_id: string;
  starting_time: Date;
  ending_time: Date;
  participants: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId;
        ref: "User";
      };
      score: number;
      time: number;
    }
  ];
}

const ContestSchema = new mongoose.Schema<IContest>(
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
    starting_time: {
      type: Date,
      required: true,
    },
    ending_time: {
      type: Date,
      required: true,
    },
    participants: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        score: {
          type: Number,
          default: 0,
        },
        time: {
          type: Number,
          default: 0,
        },
      },
    ],
  },

  { collection: "contest", timestamps: true }
);

export default mongoose.model<IContest>("Contest", ContestSchema);
export { IContest };

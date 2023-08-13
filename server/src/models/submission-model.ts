import mongoose, { Document } from "mongoose";
import { IProblem } from "./problem-model.js";
import { IUser } from "./user-model.js";

interface ISubmission extends Document {
	problem_id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	submission_id: number;
	lang: string;
	code: string;
	submission_time: Date;
	verdict: string;
	cpu_time: number;
	memory: number;
	code_size: number;
}

const SubmissionSchema = new mongoose.Schema<ISubmission>(
	{
		problem_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Problem",
			required: true,
			index: true,
		} as IProblem["_id"],
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		} as IUser["_id"],
		submission_id: {
			type: Number,
			required: true,
			unique: true,
			default: 0,
		},
		lang: {
			type: String,
			trim: true,
			required: true,
		},
		code: {
			type: String,
			required: true,
			trim: true,
		},
		submission_time: {
			type: Date,
			required: true,
			sorted: true,
			default: Date.now,
		},
		verdict: {
			type: String,
			required: true,
			trim: true,
		},
		cpu_time: {
			type: Number,
			required: true,
		},
		memory: {
			type: Number,
			required: true,
		},
		code_size: {
			type: Number,
			required: true,
		},
	},
	{ collection: "submission" }
);

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
export { ISubmission };

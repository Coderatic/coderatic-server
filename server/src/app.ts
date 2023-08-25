import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passportSetup from "./configs/passport-setup.js";

//Microservices
import JudgeQueue from "./microservices/judge/judge-queue.js";

//Configs
import { connectDB } from "./configs/db-setup.js";
connectDB();

// Routes
import authRoutes from "./routes/auth-routes.js";
import OAuthRoutes from "./routes/oauth-routes.js";
import submissionRoutes from "./routes/submission-routes.js";
import problemRoutes from "./routes/problem-routes.js";

const app = Express();

import dotenv from "dotenv";
dotenv.config();

import { CLIENT_URI, SERVER_URI } from "./configs/runtime-envs.config.js";

// middlewares
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);
app.use(cookieParser());
app.use(passportSetup.initialize());

const corsOptions = {
	origin: CLIENT_URI,
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes middlewares
app.use("/api/auth/", authRoutes);
app.use("/api/oauth", OAuthRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submission", submissionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
	console.log(`Server is up and running at ${SERVER_URI}.`);
	const awaitedJobs =
		(await JudgeQueue.getFailedCount()) +
		(await JudgeQueue.getWaitingCount()) +
		(await JudgeQueue.getActiveCount());
	if (awaitedJobs > 0) {
		try {
			await JudgeQueue.resume(true);
			console.log("Queue processing resumed.");
		} catch (error) {
			console.error("Error resuming queue processing:", error);
		}
	}
});

import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passportSetup from "./configs/passport-setup.js";

//Configs
import { connectDB } from "./configs/db-setup.js";
connectDB();

// Routes
import authRoutes from "./routes/auth-routes.js";
import OAuthRoutes from "./routes/oauth-routes.js";
import submissionRoutes from "./routes/submission-routes.js";
import problemRoutes from "./routes/problem-routes.js";

const app = Express();
import http from "http";

http.createServer(app);

import dotenv from "dotenv";
dotenv.config();

// Cleaner env variables
const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL =
  NODE_ENV == "production"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;

// middlewares
app.use(morgan(NODE_ENV === "production" ? "tiny" : "dev"));
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

// Set credentials to true
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes middlewares
app.use("/api/auth", authRoutes);
app.use("/api/oauth", OAuthRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submission", submissionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at ${CLIENT_URL}.`);
});

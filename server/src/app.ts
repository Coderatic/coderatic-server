import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passportSetup from "./configs/passport-setup.js";

// Routes
import authRoutes from "./routes/auth-routes.js";
import OAuthRoutes from "./routes/oauth-routes.js";
import submissionRoutes from "./routes/submission-routes.js";
import problemRoutes from "./routes/problem-routes.js";

import fs from "fs";
const app = Express();
import http from "http";
const options = {
  key: fs.readFileSync('/home/saad/cert/CA/localhost/localhost.decrypted.key'),
  cert: fs.readFileSync('/home/saad/cert/CA/localhost/localhost.crt'),
};
http.createServer(app);

import dotenv from "dotenv";
dotenv.config();

// db connection
const uri = process.env.CONNECTION_STRING;

async function connectToDB() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
}

connectToDB();

// middlewares
app.use(morgan("dev"));
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
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes middlewares
app.use("/api/auth", authRoutes);
app.use("/api/oauth", OAuthRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/submission", submissionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});

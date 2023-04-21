import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth-routes.js";
import submissionRoutes from "./routes/submission-routes.js";
import problemRoutes from "./routes/problem-routes.js";

const app = Express();
import http from "http";
http.createServer(app);

import dotenv from "dotenv";
dotenv.config();

// db connection
//const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.tlyosaf.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb://127.0.0.1:27017/coderatic`;

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

// Set credentials to true
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// routes middlewares
app.use("/api/auth", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/submission", submissionRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});

import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Routes
const authRoutes = require("./routes/auth-routes");

const app = Express();
const http = require("http").createServer(app);

// db connection
dotenv.config();

const password = encodeURIComponent(process.env.DB_PASSWORD);
const uname = encodeURIComponent(process.env.DB_USERNAME);
const dbname = encodeURIComponent(process.env.DB_NAME);
const uri = `mongodb+srv://${uname}:${password}@${dbname}.tlyosaf.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Error connecting to database ${err}`);
  });

// middlewares

app.use(cors());
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

// routes middlewares
app.use("/api", authRoutes);

export default app;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});

import mongoose from "mongoose";
import dotenv from "dotenv";

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

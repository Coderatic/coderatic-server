import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.CONNECTION_STRING, {
      dbName: process.env.NODE_ENV === "production" ? "production" : "dev",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Error: ", err);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("\nDB connection closed through app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("\nDB connection closed through app termination");
  process.exit(0);
});

export { connectDB };

import mongoose from "mongoose";

const password = encodeURIComponent("nMNlOLixz5EMMnkD");
const uri = `mongodb+srv://saada:${password}@coderatic.tlyosaf.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Error connecting to database ${err}`);
  });

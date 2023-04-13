import { check, body, header } from "express-validator";
import Problem from "../models/problem-model.js";
import User from "../models/problem-model.js";
import jwt from "jsonwebtoken";

const submissionValidator = [
  body("problem_id").not().isEmpty().withMessage("Problem ID is required"),
  //body("user_id").not().isEmpty().withMessage("User ID is required"),
  body("source_code").not().isEmpty().withMessage("Code is required"),
  body("lang").not().isEmpty().withMessage("Language is required"),
  body("lang.name").not().isEmpty().withMessage("Language is required"),
  check("lang.name")
  .isIn([
    "c",
    "cpp",
    "java",
    "py3",
    "javascript",
      "typescript",
      "kotlin",
      "golang",
      "rust",
      "csharp",
      "scala",
      "haskell",
    ])
    .withMessage("Invalid language"),
  // header("token").not().isEmpty().withMessage("You must be logged-in"),
  // header("token").custom((value) => {
  //   jwt.verify(value, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       throw new Error("You are not authorized to perform this action.");
  //     }
  //   });
  // }),
];

export { submissionValidator };

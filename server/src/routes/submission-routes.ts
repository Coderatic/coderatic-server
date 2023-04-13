import express from "express";
const router = express.Router();
import { submitProblem, getProblemData } from "../controller/submission-controller.js";

// validators
import runValidation from "../validators/index.js";
import { submissionValidator } from "../validators/submission-validator.js";

// if validation is passed, call the submitProblem controller
router.post("/submit-code", submissionValidator, runValidation, submitProblem);
router.get("/get-problem-data", getProblemData);

export default router;

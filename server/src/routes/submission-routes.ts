import express from "express";
const router = express.Router();
import { submitProblem } from "../controller/submission-controller.js";

// validators
import runValidation from "../validators/index.js";
import { submissionValidator } from "../validators/submission-validator.js";

// if validation is passed, call the submitProblem controller
router.post("/code", submissionValidator, runValidation, submitProblem);

export default router;

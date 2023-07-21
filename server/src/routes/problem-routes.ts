import express from "express";
const router = express.Router();
import { getProblemData } from "../controller/problem-controller.js";

// validators
import runValidation from "../validators/index.js";
import { getProblemDataValidator } from "../validators/problem-validator.js";

router.get("/get-problem", getProblemDataValidator, runValidation, getProblemData);

export default router;

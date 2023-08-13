import express from "express";
const router = express.Router();
import {
	submitProblem,
	getMySubmissions,
} from "../controller/submission-controller.js";

import passport from "../configs/passport-setup.js";

// validators
import runValidation from "../validators/index.js";
import { submissionValidator } from "../validators/submission-validator.js";

router.post(
	"/code",
	submissionValidator,
	runValidation,
	passport.authenticate("jwt", { session: false }),
	submitProblem
);
router.get(
	"/mine",
	passport.authenticate("jwt", { session: false }),
	getMySubmissions
);

export default router;

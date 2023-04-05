import express from "express";
const router = express.Router();
import {
  preSignUp,
  signup,
  signin,
  verifyToken,
  signout,
  forgotPassword,
  resetPassword,
} from "../controller/auth-controller.js";

// validators
import runValidation from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth-validator.js";

// if validation is passed, execute the code in signup and signin controllers
router.post("/pre-signup", userSignupValidator, runValidation, preSignUp);
router.post("/signup", signup);
router.post("/verify", verifyToken);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

export default router;

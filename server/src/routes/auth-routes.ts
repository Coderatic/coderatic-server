import express from "express";
const router = express.Router();
const {
  preSignup,
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth-controller");

// validators
import runValidation from "../validators/index.js";
import {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth-validator.js";

// if validation is passed, execute the code in signup and signin controllers
router.post("/pre-signup", userSignupValidator, runValidation, preSignup);
router.post("/signup", signup);
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

module.exports = router;

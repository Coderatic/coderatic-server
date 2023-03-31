import { body } from "express-validator";

const userSignupValidator = [
  body("username").isEmpty().withMessage("Username is required"),
  body("email").not().isEmail().withMessage("Must be a valid email address"),
  body("password")
    .not()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const userSigninValidator = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const forgotPasswordValidator = [
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

const resetPasswordValidator = [
  body("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};

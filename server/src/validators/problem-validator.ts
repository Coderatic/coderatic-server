import { body } from "express-validator";

const getProblemDataValidator = [
  body("problem_id").not().isEmpty().withMessage("Problem ID is required"),
];

export { getProblemDataValidator };

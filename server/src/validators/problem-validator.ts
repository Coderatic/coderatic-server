import { query } from "express-validator";

const getProblemDataValidator = [
  query("problem_id").not().isEmpty().withMessage("Problem ID is required"),
];

export { getProblemDataValidator };

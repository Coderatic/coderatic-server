import Problem from "../models/problem-model.js";
import TestCase from "../models/hidden-test-model.js";

const getProblemData = async (req, res) => {
  const problem_id = req.query.problem_id;

  const problem = await Problem.findOne({ short_id: problem_id });
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  return res.status(200).json({
    problem_data: {
      name: problem.name,
      statement: problem.statement,
      input_format: problem.input_format,
      output_format: problem.output_format,
      sample_tests: await TestCase.find({
        problem_id: problem._id,
        test_type: "sample",
      }).select("-_id -problem_id -test_type -__v"),
    },
  });
};

export { getProblemData };

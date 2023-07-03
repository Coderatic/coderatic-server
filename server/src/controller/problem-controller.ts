import Problem from "../models/problem-model.js";
import SampleSet from "../models/sample-set-model.js";

const getProblemData = async (req, res) => {
  const problem_id = req.query.problem_id;

  const problem = await Problem.findOne({ short_id: problem_id });
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  return res.status(200).json({
    problem_data: {
      name: problem.name,
      description: problem.description,
      input_format: problem.input_format,
      output_format: problem.output_format,
      sample_sets: await SampleSet.find({
        problem_id: problem._id,
      }).select("-problem_id"),
    },
  });
};

export { getProblemData };

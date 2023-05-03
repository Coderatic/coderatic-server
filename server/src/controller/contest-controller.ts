import Contest from "../models/contest-model.js";
import SampleSet from "../models/sample-set-model.js";

const getAllContestList = async (req, res): Promise<Express.Response> => {
  return res.status(200).json({
    contests: await Contest.find({}).select(
      "-participants -__v -_id -createdAt -updatedAt -starting_time -ending_time"
    ),
  });
};

const getContestData = async (req, res): Promise<Express.Response> => {
  const contest_id = req.query.contest_id;
  const contest = await Contest.findOne({ short_id: contest_id }).select(
    "-participants"
  );
  if (!contest) {
    return res.status(400).json({ message: "Invalid contest id" });
  }
  return res.status(200).json({
    contest_data: {
      name: contest.name,
      short_id: contest.short_id,
      starting_time: contest.starting_time,
      ending_time: contest.ending_time,
    },
  });
};

const createContest = async (req, res): Promise<Express.Response> => {
  const { name, starting_time, ending_time } = req.body;
  const contest = new Contest({
    name,
    starting_time,
    ending_time,
  });
  await contest.save();
  return res.status(200).json({
    message: "Contest created successfully",
  });
};

export { getAllContestList, getContestData };

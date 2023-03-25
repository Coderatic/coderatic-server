import app from "../controller/app.js";
import User from "../models/user.js";

const authRoute = async () => {
  app.post("/auth", async (req, res) => {
    const { username: _username, password: _password } = req.body;
    try {
      const authUser = await User.findOne({ username: _username });
      if (!authUser) throw new Error("Username or Password incorrect");
      //TODO: Add password hashing auth
      res.status(200).json({
        message: "You have been logged in",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
};

export default authRoute;

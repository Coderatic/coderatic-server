import app from "../controller/app.js";
import User from "../models/user.js";
import "../controller/config.js";

const regRoute = async () => {
  app.post("/register", async (req, res) => {
    const {
      username: _username,
      email: _email,
      password: _password,
      fname: _fname,
      lname: _lname,
    } = req.body;
    try {
      if (await User.exists({ username: _username }))
        throw new Error("This username is taken");
      if (await User.exists({ email: _email }))
        throw new Error("This email is taken");
      
      await User.create({
        first_name: _fname,
        last_name: _lname,
        username: _username,
        email: _email,
        hashed_password: _password,
      });
      res.status(200).json({
        message: `You have successfuly been registered`,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
};

export default regRoute;

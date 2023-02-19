import app from "../controller/app.js";
import UserModel from "../models/user.js";
import CredentialsModel from "../models/credentials.js";

let userTable = new UserModel();
let credTable = new CredentialsModel();

const authRoute = () => {
  app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    try {
      userTable.addTuple(username, email);
      credTable.addTuple(password);
      res.send({
        message: `You have successfuly been registered`,
      });
    } catch (err) {
      res.send({
        message: `The username or email already exists`,
      });
    }
  });
};

export default authRoute;


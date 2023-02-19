import app from "../controller/app.js";
import User from "../models/user.js";
import Credentials from "../models/credentials.js";
import { syncDatabase } from "../controller/config.js";

const createAuthTables = () => {
  let userTable = new User();
  let credTable = new Credentials();
  syncDatabase();
  return { userTable, credTable };
};

const regEndPoint = async (userTable: User, credTable: Credentials) => {
  app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      await userTable.insert({
        userName: username,
        email: email,
      });
      await credTable.insert({ passwordHash: password });
      res.status(200).json({
        message: `You have successfuly been registered`,
      });
      syncDatabase();
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
};

export { regEndPoint, createAuthTables };

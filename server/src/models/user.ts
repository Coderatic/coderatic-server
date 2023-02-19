import { coderatic_sql } from "../controller/config.js";
import Model from "./model.js";
import { DataTypes, Op } from "sequelize";

class User implements Model {
  schema: any;
  constructor() {
    this.schema = coderatic_sql.define("user", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  }

  async insert(userInfo: { userName: string; email: string }) {
    try {
      const { userName: uName, email: email } = userInfo;
      const existingUser = await this.schema.findOne({
        where: {
          [Op.or]: [{ userName: uName }, { email: email }],
        },
      });
      if (existingUser) {
        throw Error("User already exists");
      }
      const newUser = await this.schema.create({ userName: uName, email });
      console.log("New user created:", newUser.toJSON());
    } catch (err) {
      console.error("Error creating new user:", err);
      throw err;
    }
  }

  async truncate() {
    try {
      await this.schema.destroy({ where: {} });
      console.log("Users table deleted successfully");
    } catch (error) {
      console.error("Error deleting users table:", error);
    }
  }
}

export default User;

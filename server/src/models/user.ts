import coderatic_sql from "../controller/config.js";
import { Sequelize, DataTypes } from "sequelize";

class UserModel {
  schema: any;
  constructor() {
    this.schema = coderatic_sql.define("User", {
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

  async addTuple(userName: string, email: string) {
    try {
      const newUser = await this.schema.create({ userName, email });
      console.log("New user created:", newUser.toJSON());
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  }
  async deleteSchema() {
    try {
      await this.schema.destroy({ where: {} });
      console.log("Users table deleted successfully");
    } catch (error) {
      console.error("Error deleting users table:", error);
    }
  }
}

export default UserModel;

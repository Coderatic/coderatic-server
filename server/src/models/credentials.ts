import { coderatic_sql } from "../controller/config.js";
import Model from "./model.js";
import { Sequelize, DataTypes } from "sequelize";

class Credentials implements Model {
  schema: any;
  constructor() {
    this.schema = coderatic_sql.define("credentials", {
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authProvider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authToken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
    });
  }
  async insert(credInfo: {
    passwordHash: string;
    authProvider?: string;
    authToken?: string;
  }) {
    try {
      const { passwordHash, authProvider, authToken } = credInfo;
      const newCreds = await this.schema.create({
        passwordHash,
        authProvider,
        authToken,
      });
      console.log("New credentials added:", newCreds.toJSON());
    } catch (error) {
      console.error("Error adding new credentials:", error);
    }
  }

  async truncate() {
    try {
      await this.schema.destroy({ where: {} });
      console.log("Credentials table deleted successfully");
    } catch (error) {
      console.error("Error deleting Credentials table:", error);
    }
  }
}

export default Credentials;

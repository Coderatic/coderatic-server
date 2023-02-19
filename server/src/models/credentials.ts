import coderatic_sql from "../controller/config.js";
import { Sequelize, DataTypes } from "sequelize";

class CredentialsModel {
  schema: any;
  constructor() {
    this.schema = coderatic_sql.define("credentials", {
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authProvider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authToken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
  }
  async addTuple(
    passwordHash: string,
    authProvider: string = null,
    authToken: string = null
  ) {
    try {
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
  async deleteSchema() {
    try {
      await this.schema.destroy({ where: {} });
      console.log("Credentials table deleted successfully");
    } catch (error) {
      console.error("Error deleting Credentials table:", error);
    }
  }
}

export default CredentialsModel;

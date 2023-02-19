import { Sequelize } from "sequelize";

const coderatic_sql = new Sequelize("coderatic", "saada", "YiJ5#Tj&7SqK6AEz", {
  host: "localhost",
  dialect: "mysql",
});

async function syncDatabase() {
  try {
    await coderatic_sql.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

export { coderatic_sql, syncDatabase };

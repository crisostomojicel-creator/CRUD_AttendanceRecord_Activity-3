
import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { AttendanceRecord } from "./models/AttendanceRecord.js";
import inquirer from "inquirer";

const rootSequelize = new Sequelize(
  "mysql://root:root@localhost:3306/"
);

const { createDb } = await inquirer.prompt([
  {
    type: "confirm",
    name: "createDb",
    message: "Create database 'CRUD_AttendanceRecord' if needed?",
    default: true,
  },
]);

try {
  if (createDb) {
    await rootSequelize.query(
      "CREATE DATABASE IF NOT EXISTS CRUD_AttendanceRecord;"
    );
    console.log("Database created or already exists.");
  }

  await sequelize.authenticate();
  console.log("Connected to MySQL database!");

  await AttendanceRecord.sync();
  console.log("AttendanceRecord table created or already exists!");
} catch (err) {
  console.error("Migration failed:", err);
} finally {
  await sequelize.close();
  await rootSequelize.close();
}

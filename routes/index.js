import express from "express";
import { homePage } from "../controllers/homeController.js";
import {
  loginPage,
  registerPage,
  forgotPasswordPage,
  dashboardPage,
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/authController.js";

import { attendancerecordcontroller } from "../controllers/attendancerecordcontroller.js";

const router = express.Router();

// Home route
router.get("/", homePage);

// Authentication routes
router.get("/login", loginPage);
router.post("/login", loginUser);

router.get("/register", registerPage);
router.post("/register", registerUser);

router.get("/forgot-password", forgotPasswordPage);
router.get("/dashboard", dashboardPage);
router.get("/logout", logoutUser);

// Attendance Record CRUD routes
router.get(
  "/attendanceRecords",
  attendancerecordcontroller.index
);

router.post(
  "/attendanceRecords",
  attendancerecordcontroller.insert
);

router.get(
  "/attendanceRecords/:id",
  attendancerecordcontroller.show
);

router.put(
  "/attendanceRecords/:id",
  attendancerecordcontroller.update
);

router.delete(
  "/attendanceRecords/:id",
  attendancerecordcontroller.delete
);

export default router;
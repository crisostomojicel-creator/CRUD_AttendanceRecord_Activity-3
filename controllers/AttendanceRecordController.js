
import { AttendanceRecord } from "../models/AttendanceRecord.js";

const attendancerecordcontroller = {
  // Display all attendance records
  index: async (req, res) => {
    try {
      const records = await AttendanceRecord.findAll();

      const attendanceRecords = records.map((record) => {
        const data = record.toJSON();

        const formatTime = (time) => {
          if (!time) return "";

          const parts = String(time).split(":");
          let hour = parseInt(parts[0], 10);
          const minute = parts[1] || "00";

          if (Number.isNaN(hour)) return time;

          const period = hour >= 12 ? "PM" : "AM";
          hour = hour % 12 || 12;

          return `${hour}:${minute} ${period}`;
        };

        data.timeIn = formatTime(data.timeIn);
        data.timeOut = formatTime(data.timeOut);

        return data;
      });

      res.render("insert", { attendanceRecords });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Add attendance record
  insert: async (req, res) => {
    try {
      const { EmployeeName, date, timeIn, timeOut, status } = req.body;

      await AttendanceRecord.create({
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      });

      res.redirect("/attendanceRecords");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Display one record for editing
  show: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(req.params.id);

      if (!attendanceRecord) {
        return res.status(404).send("Attendance record not found.");
      }

      res.render("edit", { attendanceRecord });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Update record
  update: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(req.params.id);

      if (!attendanceRecord) {
        return res.status(404).send("Attendance record not found.");
      }

      const { EmployeeName, date, timeIn, timeOut, status } = req.body;

      await attendanceRecord.update({
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      });

      res.redirect("/attendanceRecords");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Delete record
  delete: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(req.params.id);

      if (!attendanceRecord) {
        return res.status(404).send("Attendance record not found.");
      }

      await attendanceRecord.destroy();

      res.redirect("/attendanceRecords");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

export { attendancerecordcontroller };

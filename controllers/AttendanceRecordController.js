/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { AttendanceRecord } from "../models/AttendanceRecord.js";

const AttendanceRecordController = {
  // READ: Display all attendance records
  index: async (req, res) => {
    try {
      const attendanceRecords = await AttendanceRecord.findAll();
      res.json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // CREATE: Add attendance record
  insert: async (req, res) => {
    try {
      const {
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      } = req.body;

      if (!EmployeeName || !date || !timeIn || !timeOut || !status) {
        return res.status(400).json({
          message: "All attendance fields are required.",
        });
      }

      const attendanceRecord = await AttendanceRecord.create({
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      });

      res.status(201).json(attendanceRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // READ: Display one attendance record
  show: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(
        req.params.id
      );

      if (!attendanceRecord) {
        return res.status(404).json({
          message: "Attendance record not found.",
        });
      }

      res.json(attendanceRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // UPDATE: Edit attendance record
  update: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(
        req.params.id
      );

      if (!attendanceRecord) {
        return res.status(404).json({
          message: "Attendance record not found.",
        });
      }

      const {
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      } = req.body;

      await attendanceRecord.update({
        EmployeeName,
        date,
        timeIn,
        timeOut,
        status,
      });

      res.json({
        message: "Attendance record updated successfully.",
        attendanceRecord,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE: Remove attendance record
  delete: async (req, res) => {
    try {
      const attendanceRecord = await AttendanceRecord.findByPk(
        req.params.id
      );

      if (!attendanceRecord) {
        return res.status(404).json({
          message: "Attendance record not found.",
        });
      }

      await attendanceRecord.destroy();

      res.json({
        message: "Attendance record deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export { attendancerecordcontroller };
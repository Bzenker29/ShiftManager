import express from "express";
import {
  createAvailabilityController,
  getAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
} from "../controllers/availabilityController.js";
import { query } from "../db.js";

const router = express.Router();

// Create a new availability
router.post("/:employeeId", createAvailabilityController);

// Get all availability for one employee
router.get("/:employeeId", getAvailabilityController);

// Update a specific day for an employee
router.put("/:employeeId/:dayOfWeek", updateAvailabilityController);

// Delete a specific day for an employee
router.delete("/:employeeId/:dayOfWeek", deleteAvailabilityController);

// NEW: Get all availability for all employees
router.get("/", async (req, res) => {
  try {
    const { rows } = await query(
      `SELECT a.*, e.name 
       FROM employee_availability_tb a 
       JOIN employees_tb e ON a.employee_id = e.id 
       ORDER BY a.employee_id, a.day_of_week`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all availability" });
  }
});

export default router;

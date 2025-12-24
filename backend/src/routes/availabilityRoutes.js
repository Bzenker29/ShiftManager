import express from "express";
import {
  createAvailabilityController,
  getAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
} from "../controllers/availabilityController.js";

const router = express.Router();

// Create a new availability
router.post("/:employeeId", createAvailabilityController);

// Get all availability for one employee
router.get("/:employeeId", getAvailabilityController);

// Update a specific day for an employee
router.put("/:employeeId/:dayOfWeek", updateAvailabilityController);

// Delete a specific day for an employee
router.delete("/:employeeId/:dayOfWeek", deleteAvailabilityController);

export default router;

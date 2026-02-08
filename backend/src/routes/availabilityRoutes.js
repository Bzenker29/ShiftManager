import express from "express";
import {
  createAvailabilityController,
  getAvailabilityController,
  updateAvailabilityController,
  deleteAvailabilityController,
  getAllAvailabilityController,
} from "../controllers/availabilityController.js";

import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
// Create unavailability (date-based)
router.post("/", createAvailabilityController);

// Get all availability (calendar view)
router.get("/", getAllAvailabilityController);

// Get availability for one employee
router.get("/employee/:employeeId", getAvailabilityController);

// Update a specific availability entry
router.put("/:availabilityId", updateAvailabilityController);

// Delete a specific availability entry
router.delete("/:availabilityId", deleteAvailabilityController);

export default router;

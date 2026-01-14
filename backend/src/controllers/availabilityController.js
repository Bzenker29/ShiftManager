import { query } from "../db.js";

import {
  createAvailability,
  getAvailabilityByEmployee,
  updateAvailability,
  deleteAvailability,
} from "../services/availabilityService.js";

// POST /api/availability/:employeeId
export const createAvailabilityController = async (req, res) => {
  try {
    console.log("🟡 createAvailabilityController");
    const { date, start_time, end_time, employee_id } = req.body;

    const newAvailability = await createAvailability(
      employee_id, // use body value
      date,
      start_time,
      end_time
    );

    res.status(201).json(newAvailability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create availability" });
  }
};

// GET /api/availability/:employeeId
export const getAvailabilityController = async (req, res) => {
  try {
    console.log("🟡 getAvailabilityController");
    const { employeeId } = req.params;
    const availability = await getAvailabilityByEmployee(employeeId);
    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};

// NEW: GET all availability for all employees
export const getAllAvailabilityController = async (req, res) => {
  try {
    console.log("🟡 getAllAvailabilityController");
    const { rows } = await query(
      `SELECT a.*, e.name 
       FROM employee_availability_tb a
       JOIN employees_tb e ON a.employee_id = e.id
       ORDER BY a.employee_id, a.date`
    );
    res.json(rows); // ✅ must return an array
  } catch (err) {
    console.error(err); // logs in backend terminal
    res.status(500).json({ error: "Failed to fetch all availability" });
  }
};

// PUT /api/availability/:employeeId/:date
export const updateAvailabilityController = async (req, res) => {
  console.log("🟡 updateAvailabilityController");
  console.log("🟠 UPDATE req.params:", req.params);
  console.log("🟠 UPDATE req.body:", req.body);

  const { availabilityId } = req.params;
  const { employee_id, date, start_time, end_time } = req.body;

  if (!availabilityId || !employee_id || !date || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await query(
      `
      UPDATE employee_availability_tb
      SET employee_id = $1,
          date = $2,
          start_time = $3,
          end_time = $4
      WHERE id = $5
      RETURNING *;
      `,
      [employee_id, date, start_time, end_time, availabilityId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ UPDATE availability error:", err);
    res.status(500).json({ error: "Failed to update availability" });
  }
};

// DELETE /api/availability/:employeeId/:date
export const deleteAvailabilityController = async (req, res) => {
  const { availabilityId } = req.params;

  if (!availabilityId) {
    return res.status(400).json({ error: "Missing availabilityId" });
  }

  try {
    const result = await query(
      "DELETE FROM employee_availability_tb WHERE id = $1 RETURNING *",
      [availabilityId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Availability entry not found" });
    }

    res
      .status(200)
      .json({ message: "Deleted successfully", deleted: result.rows[0] });
  } catch (err) {
    console.error("❌ DELETE availability error:", err);
    res.status(500).json({ error: err.message });
  }
};

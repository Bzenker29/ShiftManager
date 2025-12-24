import {
  createAvailability,
  getAvailabilityByEmployee,
  updateAvailability,
  deleteAvailability,
} from "../services/availabilityService.js";

// POST /api/availability/:employeeId
export const createAvailabilityController = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { day_of_week, start_time, end_time } = req.body;

    const newAvailability = await createAvailability(
      employeeId,
      day_of_week,
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
    const { employeeId } = req.params;
    const availability = await getAvailabilityByEmployee(employeeId);
    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};

// PUT /api/availability/:employeeId/:dayOfWeek
export const updateAvailabilityController = async (req, res) => {
  try {
    const { employeeId, dayOfWeek } = req.params;
    const { start_time, end_time } = req.body;

    const updated = await updateAvailability(
      employeeId,
      dayOfWeek,
      start_time,
      end_time
    );

    if (!updated) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update availability" });
  }
};

// DELETE /api/availability/:employeeId/:dayOfWeek
export const deleteAvailabilityController = async (req, res) => {
  try {
    const { employeeId, dayOfWeek } = req.params;

    const deleted = await deleteAvailability(employeeId, dayOfWeek);

    if (!deleted) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.json({ message: "Availability deleted", deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete availability" });
  }
};

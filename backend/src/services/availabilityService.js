import { query } from "../db.js";

// Create availability
export const createAvailability = async (
  employeeId,
  date,
  startTime,
  endTime
) => {
  const empIdInt = parseInt(employeeId, 10);
  if (isNaN(empIdInt)) {
    throw new Error(`Invalid employeeId: ${employeeId}`);
  }

  const { rows } = await query(
    `
    INSERT INTO employee_availability_tb (employee_id, date, start_time, end_time)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [empIdInt, date, startTime, endTime]
  );

  return rows[0];
};

// Get all availability for one employee
export const getAvailabilityByEmployee = async (employeeId) => {
  const empIdInt = parseInt(employeeId, 10);
  if (isNaN(empIdInt)) throw new Error(`Invalid employeeId: ${employeeId}`);

  const { rows } = await query(
    `
    SELECT *
    FROM employee_availability_tb
    WHERE employee_id = $1
    ORDER BY date
    `,
    [empIdInt]
  );

  return rows;
};

// Update availability
export const updateAvailability = async (
  employeeId,
  date,
  startTime,
  endTime
) => {
  const empIdInt = parseInt(employeeId, 10);
  if (isNaN(empIdInt)) {
    throw new Error(`Invalid employeeId: ${employeeId}`);
  }

  const { rows } = await query(
    `
    UPDATE employee_availability_tb
    SET start_time = $1,
        end_time = $2,
        updated_at = NOW()
    WHERE employee_id = $3
      AND date = $4
    RETURNING *
    `,
    [startTime, endTime, empIdInt, date]
  );

  return rows[0];
};

// Delete availability
export const deleteAvailability = async (employeeId, date) => {
  const empIdInt = parseInt(employeeId, 10);
  if (isNaN(empIdInt)) {
    throw new Error(`Invalid employeeId: ${employeeId}`);
  }

  const { rows } = await query(
    `
    DELETE FROM employee_availability_tb
    WHERE employee_id = $1
      AND date = $2
    RETURNING *
    `,
    [empIdInt, date]
  );

  return rows[0];
};

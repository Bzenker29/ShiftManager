import { query } from "../db.js";

export const getEmployees = async () => {
  const { rows } = await query(`
    SELECT
      ROW_NUMBER() OVER (ORDER BY id ASC) AS display_id,
      id,
      name,
      email,
      phone,
      job,
      rate,
      isactive
    FROM employees_tb
    ORDER BY id ASC
  `);

  return rows;
};

export const createEmployee = async (employeeData) => {
  const { name, email, phone, job, rate, isactive } = employeeData;
  const { rows } = await query(
    `INSERT INTO employees_tb (name, email, phone, job, rate, isactive)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, email, phone, job, rate, isactive]
  );
  return rows[0];
};

export const updateEmployee = async (employeeId, employeeData) => {
  const { name, email, phone, job, rate, isactive } = employeeData;
  const { rows } = await query(
    `UPDATE employees_tb
     SET name = $1, email = $2, phone = $3, job = $4, rate = $5, isactive = $6
     WHERE id = $7 RETURNING *`,
    [name, email, phone, job, rate, isactive, employeeId]
  );
  return rows[0];
};

export const deleteEmployee = async (employeeId) => {
  const { rowCount } = await query(
    `DELETE FROM employees_tb
        WHERE id = $1`,
    [employeeId]
  );
  return rowCount > 0;
};

export const searchEmployees = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM employees_tb WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR job ILIKE $1`,
    [`%${searchTerm}%`]
  );
  return rows;
};

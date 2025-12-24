import * as employeeService from "../services/employeeServices.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(200).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = Number(req.params.id);
    const employeeData = req.body;

    if (Number.isNaN(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }

    const updatedEmployee = await employeeService.updateEmployee(
      employeeId,
      employeeData
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deleted = await employeeService.deleteEmployee(employeeId);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchEmployees = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const employees = await employeeService.searchEmployees(searchTerm);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

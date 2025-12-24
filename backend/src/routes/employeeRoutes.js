import express from "express";

import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/employees", employeeController.getEmployees);
router.post("/employees", employeeController.createEmployee);

router.put("/employees/:id", employeeController.updateEmployee);

router.delete("/employees/:id", employeeController.deleteEmployee);
router.get("/employees/search", employeeController.searchEmployees);

export default router;

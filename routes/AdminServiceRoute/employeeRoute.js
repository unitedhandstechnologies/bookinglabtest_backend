const express = require("express");
const router = express.Router();
const employeeService = require("../../services/adminService/employeeService");

router.post(
  "/api/employee",
  employeeService.createEmployee
);
router.get(
  "/api/employee",
  employeeService.getAllEmployees
);
router.get(
  "/api/employee/:id",
  employeeService.getEmployeeById
);
router.put(
  "/api/employee/:id",
  employeeService.replaceEmployee
);
router.patch(
  "/api/employee/:id",
  employeeService.updateEmployee
);
router.delete(
  "/api/employee/:id",
  employeeService.deleteEmployee
);
module.exports = router;

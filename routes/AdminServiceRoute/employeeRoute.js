const express = require("express");
const router = express.Router();
const employeeService = require("../../services/adminService/employeeService");
const { route } = require("./vehicleEmployeeMappingRoute");
const auth = require("../../middleware/authentication");
const checkAuth = require("../../middleware/authorization");

router.post(
  "/api/employee",
  [
    // auth,
    // checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    // checkAuth.checkAuthorization,
  ],
  employeeService.createEmployee
);
router.post(
  "/api/login",
  employeeService.loginEmployee
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

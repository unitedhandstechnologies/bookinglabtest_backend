var express = require("express");
var router = express.Router();
const auth = require("../../middleware/authentication");
const checkAuth = require("../../middleware/authorization");
const adminService = require("../../services/AdminService/adminService");
const { PERMISSIONS } = require("../../constants/enums");

router.post(
  "/api/admin",
  // [
  //   auth,
  //   checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
  //   checkAuth.checkAuthorization,
  // ],
  adminService.createAdmin
);

router.post("/api/loginAdmin", adminService.loginAdmin);

router.get(
  "/api/admins",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    checkAuth.checkAuthorization,
  ],
  adminService.getAllAdmins
);

router.get(
  "/api/admin/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    checkAuth.checkAuthorization,
  ],
  adminService.getAdminById
);

router.put(
  "/api/admin/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    checkAuth.checkAuthorization,
  ],
  adminService.replaceAdmin
);

router.patch(
  "/api/admin/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    checkAuth.checkAuthorization,
  ],
  adminService.updateAdmin
);

router.delete(
  "/api/admin/:id",
  [
    auth,
    checkAuth.permission.id.bind({ permissionId: PERMISSIONS.adminManagement }),
    checkAuth.checkAuthorization,
  ],
  adminService.deleteAdmin
);

module.exports = router;

const express = require("express");
const router = express.Router();
const userNotificationService = require("../../services/userService/userNotification");

router.post(
    "/api/users/:users_id/notification",
    userNotificationService.createUserNotification
  );
router.get(
    "/api/userNotification",
    userNotificationService.getAllUserNotification
  );
router.get(
    "/api/userNotification/:id",
    userNotificationService.getUserNotificationById
  );
router.delete(
    "/api/userNotification/:id",
    userNotificationService.deleteUserNotification
  );
module.exports = router;
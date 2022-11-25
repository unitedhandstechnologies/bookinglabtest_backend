const express = require("express");
 const router = express.Router();
 const notificationService = require("../../services/adminService/notificationService");

 router.post(
   "/api/createNotification",
    notificationService.createNewNotification
 );
 router.get(
    "/api/getAllNotification",
    notificationService.getAllNotification
 );
 router.get(
    "/api/getNotification/:id",
    notificationService.getNotificationById
 );
 router.delete(
    "/api/deleteRoute/:id",
    notificationService.deleteNotification
 );

 module.exports = router;
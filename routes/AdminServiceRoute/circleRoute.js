const express = require("express");
const router = express.Router();
const circleService = require("../../services/adminService/circleService");

router.post(
  "/api/circle",
  circleService.createCircle
);
router.get(
  "/api/circle",
  circleService.getAllCircles
);
router.get(
  "/api/circle/:id",
  circleService.getCircleById
);
router.put(
  "/api/circle/:id",
  circleService.replaceCircle
);
router.patch(
  "/api/circle/:id",
  circleService.updateCircle
);
router.delete(
  "/api/circle/:id",
  circleService.deleteCircle
);
module.exports = router;

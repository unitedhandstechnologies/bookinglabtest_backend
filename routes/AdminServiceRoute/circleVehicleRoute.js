const express = require("express");
const router = express.Router();
const circleVehicles = require("../../services/adminService/circleVehicleMapping");

router.post("/api/circle/:circle_id/circleVehicle",circleVehicles.createCircleVehicle);
router.get("/api/circleVehicle",circleVehicles.getAllVehiclesInCircle);
router.get("/api/circleVehicle/:id",circleVehicles.getVehicleInCircleById);
router.get("/api/circleVehicle/circle/:circle_id",circleVehicles.getVehiclesInCircle);
router.patch("/api/circle/:circle_id/circleVehicle/:id",circleVehicles.updateVehicleInCircle);
router.delete("/api/circleVehicle/:id",circleVehicles.deleteVehicleInCircle);
module.exports = router;

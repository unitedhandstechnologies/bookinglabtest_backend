const express = require("express");
const router = express.Router();
const circleVehicles = require("../../services/adminService/circleVehicleMapping");

router.post("/api/circle/:circle_id/circleVehicle",circleVehicles.createCircleVehicle);
router.get("/api/circleVehicle",circleVehicles.getAllVehicle_ids);
// router.get(
//   "/api/circlePincode/:id",
//   circlePincodeService.getPincodeById
// );
// router.put(
//   "/api/circlePincode/:id",
//   circlePincodeService.replacePincode
// );
// router.patch(
//   "/api/circlePincode/:id",
//   circlePincodeService.updatePincode
// );
// router.delete(
//   "/api/circlePincode/:id",
//   circlePincodeService.deletePincode
// );
module.exports = router;

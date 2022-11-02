const express = require("express");
const router = express.Router();
const circlePincodeService = require("../../services/adminService/circlePincodeMapping");

router.post(
  "/api/circle/:circle_id/circlePincode",
  circlePincodeService.createPincode
);
router.get(
  "/api/circlesPincode",
  circlePincodeService.getAllPincodes
);
router.get(
  "/api/circlePincode/:id",
  circlePincodeService.getPincodeById
);
router.put(
  "/api/circlePincode/:id",
  circlePincodeService.replacePincode
);
router.patch(
  "/api/circlePincode/:id",
  circlePincodeService.updatePincode
);
router.delete(
  "/api/circlePincode/:id",
  circlePincodeService.deletePincode
);
module.exports = router;

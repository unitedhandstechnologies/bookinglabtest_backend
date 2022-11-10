var express = require("express");
var router = express.Router();
const vehicleService = require("../../services/adminService/vehicleService");

router.post("/api/vehicle",vehicleService.createVehicle);
router.get("/api/getAllVehicle",vehicleService.getAllVehicle);
router.get("/api/getVehicleById/:id",vehicleService.getVehicleById);
router.put("/api/replaceVehicle/:id",vehicleService.replaceVehicle);
router.patch("/api/updateVehicle/:id",vehicleService.updateVehicle);
router.delete("/api/deleteVehicle/:id",vehicleService.deleteVehicle);
module.exports = router;
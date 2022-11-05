var express = require("express");
var router = express.Router();
const vehcileService = require("../../services/adminService/vehcile");

router.post("/api/vehicle",vehcileService.createVehicle);
router.get("/api/getAllVehicle",vehcileService.getAllVehicle);
router.get("/api/getVehicleById/:id",vehcileService.getVehicleById);
router.put("/api/replaceVehicle/:id",vehcileService.replaceVehicle);
router.patch("/api/updateVehicle/:id",vehcileService.updateVehicle);
router.delete("/api/deleteVehicle/:id",vehcileService.deleteVehicle);
module.exports = router;
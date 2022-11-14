var express = require("express");
var router = express.Router();
const vehicleEmployeeMapping = require("../../services/adminService/vehicleEmployeeMapping");

router.post("/api/createEmployeeMapping/vehicle/:vehicle_id",vehicleEmployeeMapping.createEmployeeVehicleMapping);
router.get("/api/getAllEmployeeVehicleMapping",vehicleEmployeeMapping.getAllVehicleEmployeeMapping);
router.get("/api/vehicle/:vehicle_id/getVehicleEmployeeMappingById/:id",vehicleEmployeeMapping.getVehicleEmployeeMappingById);
router.put("/api/vehicle/:vehicle_id/replaceVehicleEmployeeMapping/:id",vehicleEmployeeMapping.replaceVehicleEmployeeMapping);
// router.patch("/api/vehicle/:vehicle_id/updateEmployee/:id",vehicleEmployeeMapping.updateVehicleEmployeeMapping);
router.delete("/api/vehicle/:vehicle_id/deleteVehicleEmployeeMap/:id",vehicleEmployeeMapping.deleteVehicleEmployeeMapping);
module.exports = router;
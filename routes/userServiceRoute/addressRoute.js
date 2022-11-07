var express = require("express");
var router = express.Router();

const addrerssService  = require("../../services/userService/addressService");

router.post("/api/createAddress", addrerssService.createaddress);

router.get("/api/getAllAddress", addrerssService.getAllAddress);

router.get("/api/getAddressById/:id", addrerssService.getAddressById);

router.put("/api/replaceAddress/:id", addrerssService.replaceAddress);

router.patch("/api/updateAddress/:id", addrerssService.updateAddress);

router.delete("/api/deleteAddress/:id", addrerssService.deleteaddress);

module.exports = router;

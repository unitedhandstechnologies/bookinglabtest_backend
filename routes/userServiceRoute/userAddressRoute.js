var express = require("express");
var router = express.Router();

const userAddressService  = require("../../services/userService/userAddressService");

router.post("/api/createUserAddress/user/:user_id", userAddressService.createaddress);

router.get("/api/user/:user_id/getUserAddressById/:id", userAddressService.getAllAddress);

router.get("/api/user/:user_id/getUserAddresssFromUser", userAddressService.getAddressById);

router.put("/api/user/:user_id/replaceUserAddress/:id", userAddressService.replaceAddress);

router.patch("/api/user/:user_id/updateUserAddress/:id", userAddressService.updateAddress);

router.delete("/api/user/:user_id/deleteUserAddress/:id",userAddressService.deleteAddress);

module.exports = router;

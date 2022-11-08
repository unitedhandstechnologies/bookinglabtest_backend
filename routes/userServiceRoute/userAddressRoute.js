var express = require("express");
var router = express.Router();

const addressService  = require("../../services/userService/userAddressService");

router.post("/api/createUserAddress/user/:user_id", addressService.createaddress);

router.get("/api/user/:user_id/getUserAddressById/:id", addressService.getAllAddress);

router.get("/api/user/:user_id/getUserAddresssFromUser", addressService.getAddressById);

router.put("/api/user/:user_id/replaceUserAddress/:id", addressService.replaceAddress);

router.patch("/api/user/:user_id/updateUserAddress/:id", addressService.updateAddress);

router.delete("/api/user/:user_id/deleteUserAddress/:id", addressService.deleteAddress);

module.exports = router;

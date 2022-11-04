const express = require("express");
const router = express.Router();
const discountPercentageService = require("../../services/userService/discountPercentageService");

router.post(
    "/api/createPercentage",
    discountPercentageService.createPercentage
 );
 router.get(
    "/api/getPercentage",
    discountPercentageService.getAllPercentage
 );
 router.get(
    "/api/getPercentageById/:id",
    discountPercentageService.getPercentById
 );
 router.put(
    "/api/replacePercentage/:id",
    discountPercentageService.replacePercentage
 );
 router.patch(
    "/api/updatePercentage/:id",
    discountPercentageService.updatePercentage
 );
 router.delete(
    "/api/deletePercentage/:id",
    discountPercentageService.deletePercentage
 );
 module.exports = router;
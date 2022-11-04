const express = require("express");
const router = express.Router();
const discountAmountService = require("../../services/userService/discountAmountService");

router.post(
    "/api/createAmount",
    discountAmountService.createAmount
 );
 router.get(
    "/api/getAmount",
    discountAmountService.getAllAmount
 );
 router.get(
    "/api/getAmountById/:id",
    discountAmountService.getAmountById
 );
 router.put(
    "/api/replaceAmount/:id",
    discountAmountService.replaceAmount
 );
 router.patch(
    "/api/updateAmount/:id",
    discountAmountService.updateAmount
 );
 router.delete(
    "/api/deleteAmount/:id",
    discountAmountService.deleteAmount
 );
 module.exports = router;
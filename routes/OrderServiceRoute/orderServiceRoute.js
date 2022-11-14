const express = require("express");
const router = express.Router();
const orderService = require("../../services/OrderService/orderService");

router.post(
    "/api/user/:user_id/circle/:circle_id/order",
    orderService.createOrder
 );
 router.get(
    "/api/getAvailableSlots/circle/:circle_id",
    orderService.getAvailableSlots
 );
 router.get(
    "/api/checkPincode/pincode/:pincode",
    orderService.checkAvailability
 );
 router.get(
   "/api/orders",
   orderService.getOrders
);

 module.exports = router;
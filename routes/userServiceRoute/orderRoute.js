const express = require("express");
const router = express.Router();
const OrderService = require("../../services/userService/orderService");

router.post(
    "/api/createOrder",
    OrderService.createOrder
 );
 router.get(
    "/api/getOrder",
    OrderService.getAllOrder
 );
 router.get(
    "/api/getOrderById/:id",
    OrderService.getOrderById
 );
 router.put(
    "/api/replaceOrder/:id",
    OrderService.replaceOrder
 );
 router.patch(
    "/api/updateOrder/:id",
    OrderService.updateOrder
 );
 router.delete(
    "/api/deleteOrder/:id",
    OrderService.deleteOrder
 );
 module.exports = router;
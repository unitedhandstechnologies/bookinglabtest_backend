const express = require("express");
 const router = express.Router();
 const slotRoute = require("../../services/adminService/slotService");
 
 router.post(
    "/api/createSlot",
    slotRoute.createSlot
 );
 router.get(
    "/api/getAllSlot",
    slotRoute.getAllSlot
 );
 router.get(
    "/api/getSlotById/:id",
    slotRoute.getSlotById
 );
 router.put(
    "/api/replaceSlot/:id",
    slotRoute.replaceSlot
 );
 router.patch(
    "/api/updateSlot/:id",
    slotRoute.updateSlot
 );
 router.delete(
    "/api/deleteSlot/:id",
    slotRoute.deletSlot
 );
 module.exports = router;
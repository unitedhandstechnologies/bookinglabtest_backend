const express = require("express");
const router = express.Router();
const userService = require("../../services/userService/user");

router.post("/api/user",  userService.createUser);

router.get("/api/getUserById/:id", userService.getUserById);

router.get("/api/getAllUser", userService.getAllUser);

router.delete("/api/deleteUser/:id", userService.deleteUser);

router.patch("/api/updateUser/:id", userService.updateUser);

router.put("/api/replaceUser/:id", userService.replaceUser);

module.exports = router;

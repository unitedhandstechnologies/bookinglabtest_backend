const express = require("express");
const router = express.Router();
const userService = require("../../services/userService/user");
router.post(
  "/api/user",
  userService.createUser
);

module.exports = router;

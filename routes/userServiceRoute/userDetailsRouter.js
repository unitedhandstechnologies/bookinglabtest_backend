const express = require("express");
const router = express.Router();
const userDetailsService = require("../../services/userService/userDetails");

router.post("/api/user/:userId/createUserDetails",  userDetailsService.createUserDetails);

router.get("/api/user/:userId/getUserDetailsById/:id", userDetailsService.getUserDetailsById);

router.get("/api/userDetails/getAllUserDetails", userDetailsService.getAllUserDetails);

router.get("/api/user/:userId/getUsersAllUserDetails", userDetailsService.getUsersAllUserDetails);

router.delete("/api/user/:userId/deleteUserDetails/:id", userDetailsService.deleteUserDetails);

router.patch("/api/user/:userId/updateUserDetails/:id", userDetailsService.updateUserDetails);

router.put("/api/user/:userId/replaceUserDetails/:id", userDetailsService.replaceUserDetails);

module.exports = router;
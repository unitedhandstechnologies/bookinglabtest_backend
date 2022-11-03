 const express = require("express");
 const router = express.Router();
 const testDetailService = require("../../services/adminService/testDetail");
 
 router.post(
    "/api/createTestDetails",
    testDetailService.createNewTest
 );
 router.get(
    "/api/getAllTest",
    testDetailService.getAllTest
 );
 router.get(
    "/api/getTest/:id",
    testDetailService.getTestById
 );
 router.put(
    "/api/replaceTest/:id",
    testDetailService.replaceTest
 );
 router.patch(
    "/api/updateTest/:id",
    testDetailService.updateTest
 );
 router.delete(
    "/api/deleteTest/:id",
    testDetailService.deleteTest
 );

 module.exports = router;
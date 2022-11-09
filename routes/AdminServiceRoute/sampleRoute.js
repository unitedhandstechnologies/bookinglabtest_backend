const express = require("express");
const router = express.Router();
const sampleService = require("../../services/adminService/sample");

router.post(
    "/api/createSample",
    sampleService.createSample
 );
 router.get(
    "/api/getSample",
    sampleService.getAllSample
 );
 router.get(
    "/api/getSampleById/:id",
    sampleService.getSampleById
 );
 router.put(
    "/api/replaceSample/:id",
    sampleService.replaceSample
 );
 router.patch(
    "/api/updateSample/:id",
    sampleService.updateSample
 );
 router.delete(
    "/api/deleteSample/:id",
    sampleService.deleteSample
 );
 module.exports = router;
const express = require("express");
const router = express.Router();
const resultService = require("../../services/adminService/result");

router.post(
    "/api/createResult",
    resultService.createResult
 );
 router.get(
    "/api/getResult",
    resultService.getAllResult
 );
 router.get(
    "/api/getResultById/:id",
    resultService.getResultById
 );
 router.put(
    "/api/replaceResult/:id",
    resultService.replaceResult
 );
 router.patch(
    "/api/updateResult/:id",
    resultService.updateResult
 );
 router.delete(
    "/api/deleteResult/:id",
    resultService.deleteResult
 );
 module.exports = router;
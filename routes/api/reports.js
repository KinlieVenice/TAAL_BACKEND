const express = require("express");
const router = express.Router();
const reportsController = require('../../controllers/reportsController');

router.route('/')
    .get(reportsController.getAllReports)
    .post(reportsController.createReport)
    .put(reportsController.updateReport)
    .delete(reportsController.deleteReport);

router.route('/:id')
    .get(reportsController.getReport);

module.exports = router;

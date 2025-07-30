const data = {};

data.reports = require("../model/reports.json");

const createReport = (req, res) => {
    res.json({
        "report_title": req.body.report_title,
        "type_of_incident": req.body.type_of_incident,
        "who": req.body.who,
        "what": req.body.what,
        "when": req.body.when,
        "where": req.body.where,
        "why": req.body.why,
        "how": req.body.how,
        "reported_by": req.body.reported_by,
        "status": req.body.status,
        "full_report": req.body.full_report
    })
};

const getAllReports = (req, res) => {
    res.json(data.reports);
};

const getReport = (req, res) => {
   res.json({
        "id": req.params.id
    })
};

const updateReport = (req, res) => {
    res.json({
        "report_title": req.body.report_title,
        "type_of_incident": req.body.type_of_incident,
        "who": req.body.who,
        "what": req.body.what,
        "when": req.body.when,
        "where": req.body.where,
        "why": req.body.why,
        "how": req.body.how,
        "reported_by": req.body.reported_by,
        "status": req.body.status,
        "full_report": req.body.full_report
    })
}

const deleteReport = (req, res) => {
    res.json({
        "id": req.body.id
    })
};

module.exports = {
    createReport,
    getAllReports,
    getReport,
    updateReport,
    deleteReport
}
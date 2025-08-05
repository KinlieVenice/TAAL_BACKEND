const Report = require("../model/Report");
const generateFullReportAI = require("../utils/generateFullReportAI")

const createReport = async (req, res) => {
  const { title, incidentType, report, reportBy, currentStatus } = req.body;

  if (
    !title ||
    !incidentType ||
    !report?.Who ||
    !report?.What ||
    !report?.When ||
    !report?.Where ||
    !report?.Why ||
    !report?.How ||
    !reportBy ||
    !currentStatus
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newReport = await Report.create({
      title,
      incidentType,
      report, // includes Who, What, etc., including fullReport if generated
      reportBy,
      currentStatus,
    });

    const aiReport = await generateFullReportAI(newReport);
    console.log("AI Summary:", aiReport); // <-- add this

    
    if (aiReport) {
      newReport.report.fullReport = aiReport.trim();
      newReport.markModified("report"); // <-- this is the fix
      await newReport.save();
    }

    res
      .status(201)
      .json({ message: "Report created successfully", report: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving report" });
  }
};

const getAllReports = async (req, res) => {
  const reports = await Report.find(); //to get all
  if (!reports) return res.status(204).json({ message: "No reports found" });
  res.json(reports);
};

const getReport = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: `ID is required` });
  const report = await Report.findOne({ _id: req.params.id });
  if (!report) {
    return res
      .status(204)
      .json({ message: `Report ID ${req.params.id} not found` });
  }

  res.json(report);
};

const updateReport = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: `ID required` });

  const report = await Report.findOne({ _id: req.body.id });
  if (!report)
    return res
      .sendStatus(204)
      .json({ message: `No report with id: ${req.body.id}` });

  if (req.body.title) report.title = req.body.title;
  if (req.body.incidentType) report.incidentType = req.body.incidentType;

  if (req.body.report) {
    if (req.body.report.Who) report.report.Who = req.body.report.Who;
    if (req.body.report.What) report.report.What = req.body.report.What;
    if (req.body.report.When) report.report.When = req.body.report.When;
    if (req.body.report.Where) report.report.Where = req.body.report.Where;
    if (req.body.report.Why) report.report.Why = req.body.report.Why;
    if (req.body.report.How) report.report.How = req.body.report.How;
    if (req.body.report.fullReport)
      report.report.fullReport = req.body.report.fullReport;
  }

  if (req.body.reportBy) report.reportBy = req.body.reportBy;
  if (req.body.currentStatus) report.currentStatus = req.body.currentStatus;

  const result = await report.save();
  res.json(result);
};

const deleteReport = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: `ID is required` });
  const report = await Report.findOne({ _id: req.body.id });
  if (!report) {
    return res
      .status(204)
      .json({ message: `Report ID ${req.body.id} not found` });
  }
  const result = await Report.deleteOne({ _id: req.body.id });

  res.json(result);
};

module.exports = {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
};

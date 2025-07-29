const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    required: true,
  },
  report: {
    Who: {
      type: String,
      required: true
    },
    What: {
      type: String,
      required: true
    },
    When: {
      type: Date,
      required: true
    },
    Where: {
      type: String,
      required: true
    },
    Why: {
      type: String,
      required: true
    },
    How: {
      type: String,
      required: true
    },
    fullReport: {
      type: String,
      required: true
    },
  },
  reportBy: {
    type: String,
    required: true,
  },
  currentStatus: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Report", reportSchema);

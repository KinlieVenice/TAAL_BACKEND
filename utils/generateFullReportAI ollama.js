//using ollama

const axios = require("axios");

const generateFullReportAI = async (report) => {
  const prompt = `
  Summarize the following incident report into a full paragraph form in a formal tone. Use simple terms but keep it professional:

  Title: ${report.title}
  Incident Type: ${report.incidentType}
  Who: ${report.report.Who}
  What: ${report.report.What}
  When: ${new Date(report.report.When).toLocaleString()}
  Where: ${report.report.Where}
  Why: ${report.report.Why}
  How: ${report.report.How}
  Current Status: ${report.currentStatus}
  `;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: prompt,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("AI generation error:", error.message);
    return null;
  }
};

module.exports = generateFullReportAI;

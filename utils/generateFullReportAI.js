//using cohere
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

const generateFullReportAI = async (report) => {
  const prompt = `
   Using the information below, write a detailed, clear, and continuous paragraph report. Organize the facts logically and use complete sentences and simple terms. Do not add introductions like "here is the report" or any extra information.:

  Who: ${report.report.Who}
  What: ${report.report.What}
  When: ${new Date(report.report.When).toLocaleString()}
  Where: ${report.report.Where}
  Why: ${report.report.Why}
  How: ${report.report.How}
  Current Status: ${report.currentStatus}
  `;

  try {
    const response = await cohere.generate({
      model: "command-r-plus", 
      prompt: prompt,
      max_tokens: 300, 
      temperature: 0, //0.5 is some variation but still focused
    });

    return response.generations[0].text.trim();
  } catch (error) {
    console.error("AI generation error:", error.message);
    return null;
  }
};

module.exports = generateFullReportAI;

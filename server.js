require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3501;
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials")

const cors = require("cors");
const corsOptions = require("./config/corsOption");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// for connecting to mongodb
connectDB();

// middleware for logger
app.use(logger);


// middleware for credentials
app.use(credentials);


// cors whitelisting
app.use(cors(corsOptions));

// urlencoded date
app.use(express.urlencoded({ extended: false }));

// json middleware for auto parse
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Frontend routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));


// API routes
app.use("/reports", require("./routes/api/reports"));


// Catch-all 404
app.all(/^.*$/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// middleware for error handling
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler");

const cors = require('cors');

// middleware for logger
app.use(logger);

// cors
app.use(cors());

// urlencoded date
app.use(express.urlencoded( { entended: false }));

// json middleware for auto parse
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get(/^\/$|\/index(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/index.html'))
});

app.get(/^.*$/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "/404.html"));
});

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

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on: ${PORT}`))
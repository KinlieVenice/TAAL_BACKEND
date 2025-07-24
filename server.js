const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler");

const cors = require('cors');

// middleware for logger
app.use(logger);

// cors whitelisting
const whitelist = ['https://127.0.0.1:5500', 'https://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        // checks if origin is in the list
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


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

// middleware for error handling
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on: ${PORT}`))
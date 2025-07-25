const express = require('express');
const app = express();
const PORT = process.env.PORT || 3501;
const path = require('path');
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler");

const cors = require('cors');
const corsOptions = require('./config/corsOption')

// middleware for logger
app.use(logger);

// cors whitelisting

app.use(cors(corsOptions));

// urlencoded date
app.use(express.urlencoded( { extended: false }));

// json middleware for auto parse
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/reports", require("./routes/api/reports"));

app.use('/', require('./routes/root'));

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

app.listen(PORT, () => console.log(`Server running on: ${PORT}`))
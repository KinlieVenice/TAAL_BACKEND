const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns'); //an obj but deconstructed
const { v4: uuid } = require('uuid'); //uuid is a function
const fs = require('fs');


// making of dir for where logs go
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        } await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch(err){
        console.error(err)
    }
}

// function to call logEvents for sucessful events
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt');
    console.log(`${req.method}\t${req.path}`);
    next();
}


module.exports = {logEvents, logger};
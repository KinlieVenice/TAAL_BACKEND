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

module.exports = corsOptions;
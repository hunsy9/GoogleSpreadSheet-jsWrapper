const whitelist = [
    "https://haict.onthe.live",
    "http://haict.onthe.live",
    "http://localhost:3000",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("NOT allowed"));
        }
    },
    credentials: true,
};

module.exports = corsOptions;

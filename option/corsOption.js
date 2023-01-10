const whitelist = [
    "https://haict.onthe.live:3000",
    "https://haict.onthe.live:80",
    "https://haict.onthe.live:443",
    "http://haict.onthe.live:3000",
    "http://haict.onthe.live:80",
    "http://haict.onthe.live:443",
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

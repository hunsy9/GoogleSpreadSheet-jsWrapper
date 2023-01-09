const { google } = require("googleapis");
const credentials = require("./apiCredential.json");

const jwt = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ],
});

jwt.fromJSON(credentials);

module.exports = jwt;

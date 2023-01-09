const { GoogleSpreadsheet } = require("google-spreadsheet");
const { client_email, private_key } = require("./apiCredential.json");
const jwt = require("./initialFunc");
const { google } = require("googleapis");

let init = async (sheetCode) => {
    const doc = new GoogleSpreadsheet(sheetCode);
    await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
    });
    await doc.loadInfo();
    return doc;
};

const create = async () => {
    const title = "EZSTEAM 데이터 분석";
    const auth = jwt;
    const service = google.sheets({ version: "v4", auth });
    const resource = {
        properties: {
            title,
        },
    };
    try {
        const spreadsheet = await service.spreadsheets.create({
            resource,
            fields: "spreadsheetId",
        });
        console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
        const fileId = spreadsheet.data.spreadsheetId;
        const drive = google.drive({ version: "v3", auth: jwt });
        await drive.permissions.create({
            resource: {
                type: "anyone",
                role: "writer",
            },
            fileId: fileId,
            fields: "id",
        });
        return spreadsheet.data.spreadsheetId;
    } catch (err) {
        throw err;
    }
};

module.exports = { init, create };

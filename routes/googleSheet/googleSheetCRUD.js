const { google } = require("googleapis");
const fs = require("fs");
const jwt = require("./Config/initialFunc");
const logger = require("../../logConfig/logConfig");

//create parameters = {doc,sheetId}
const makeNewMemberSheet = async (doc, generatedSheetId) => {
    return new Promise(async (resolve, reject) => {
        const newSheet = await doc.addSheet(async (err, generatedSheetId) => {
            if (err) {
                logger.error("/POST:CREATE    |     " + err.message);
                reject(err);
            } else {
                const newSheet = await doc.addSheet();
                resolve(newSheet);
                logger.info("CREATE 처리완료 SheetID: " + generatedSheetId);
            }
        });
        resolve(newSheet);
    });
};

//write Parameter = {sheetCode, cellRange, JsonData}
const addDataToSpreadSheet = async (sheetCode, startPos, data) => {
    return new Promise(async (resolve, reject) => {
        const sheets = google.sheets({ version: "v4", auth: jwt });

        sheets.spreadsheets.values.update(
            {
                includeValuesInResponse: true,
                spreadsheetId: sheetCode,
                range: startPos,
                valueInputOption: "RAW",
                requestBody: {
                    values: data,
                },
            },
            (err, result, sheetCode) => {
                if (err) {
                    // Handle error
                    logger.error(
                        '/POST:WRITE , sheetID: "' +
                            sheetCode +
                            '"   |    ' +
                            err.message
                    );

                    reject(err);
                } else {
                    logger.info("WRITE 처리완료 SheetID: " + sheetCode);
                    resolve(result);
                }
            }
        );
    });
};

module.exports = {
    makeNewMemberSheet,
    addDataToSpreadSheet,
};

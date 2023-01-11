const { google } = require("googleapis");
const fs = require("fs");
const jwt = require("./Config/initialFunc");
const logger = require("../../logConfig/logConfig");

//create parameters = {doc,sheetId}
const makeNewMemberSheet = async (doc, generatedSheetId) => {
    return new Promise(async (resolve, reject) => {
        const newSheet = await doc
            .addSheet()
            .then(() => {
                logger.info("CREATE 처리완료 SheetID: " + generatedSheetId);
                resolve();
            })
            .catch((err) => {
                logger.error("CREATE 오류    |     " + err.message);
                reject(err);
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
            (err, result) => {
                if (err) {
                    // Handle error
                    logger.error(
                        'WRITE 오류 , sheetID: "' +
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

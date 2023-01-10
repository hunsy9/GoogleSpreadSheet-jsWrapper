const { json } = require("body-parser");
const { google } = require("googleapis");
const fs = require("fs");
const jwt = require("./Config/initialFunc");

//create parameters = {doc,sheetId}
const makeNewMemberSheet = async (doc) => {
    return new Promise(async (resolve, reject) => {
        const newSheet = await doc.addSheet();
        resolve(newSheet);
    });
};

//write Parameter = {sheetCode, cellRange, JsonData}
const addDataToSpreadSheet = async (sheetCode, cellRange, data) => {
    return new Promise(async (resolve, reject) => {
        const sheets = google.sheets({ version: "v4", auth: jwt });

        // const resource = {
        //     jsonData,
        // };
        sheets.spreadsheets.values.append(
            {
                spreadsheetId: sheetCode,
                range: "Sheet1!A1:A3",
                valueInputOption: "RAW",
                insertDataOption: "OVERWRITE",
                values: data,
            },
            (err, result) => {
                if (err) {
                    // Handle error
                    console.log(err);
                } else {
                    console.log(result);
                }
            }
        );

        // const sheet = await spreadSheet.sheetsByIndex[0];
        // const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } =
        //     cellRange;

        // await sheet.loadCells({
        //     startRowIndex: startRowIndex,
        //     endRowIndex: endRowIndex,
        //     startColumnIndex: startColumnIndex,
        //     endColumnIndex: endColumnIndex,
        // });
        // console.log("셀 로드 성공");

        // for (let i = startRowIndex; i < endRowIndex; i++) {
        //     for (let j = startColumnIndex; j < endColumnIndex; j++) {
        //         let a = i - startRowIndex;
        //         let b = j - startColumnIndex;
        //         sheet.getCell(i, j).value = jsonData[a][b];
        //     }
        // }

        // await sheet.saveUpdatedCells();
        resolve();
    });
};

module.exports = {
    makeNewMemberSheet,
    addDataToSpreadSheet,
};

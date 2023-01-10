//create parameters = {doc,sheetId}
const makeNewMemberSheet = async (doc) => {
    return new Promise(async (resolve, reject) => {
        const newSheet = await doc.addSheet();
        resolve(newSheet);
    });
};

//write Parameter = {sheetCode, cellRange, JsonData}
const addDataToSpreadSheet = async (spreadSheet, cellRange, jsonData) => {
    return new Promise(async (resolve, reject) => {
        const sheet = await spreadSheet.sheetsByIndex[0];
        const { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } =
            cellRange;

        await sheet.loadCells({
            startRowIndex: startRowIndex,
            endRowIndex: endRowIndex,
            startColumnIndex: startColumnIndex,
            endColumnIndex: endColumnIndex,
        });
        console.log("셀 로드 성공");

        for (let i = startRowIndex; i < endRowIndex; i++) {
            for (let j = startColumnIndex; j < endColumnIndex; j++) {
                let a = i - startRowIndex;
                let b = j - startColumnIndex;
                sheet.getCell(i, j).value = jsonData[a][b];
            }
        }

        await sheet.saveUpdatedCells();
        resolve();
    });
};

module.exports = {
    makeNewMemberSheet,
    addDataToSpreadSheet,
};

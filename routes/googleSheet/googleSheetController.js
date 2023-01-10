const express = require("express");
const router = express.Router();
const {
    makeNewMemberSheet,
    addDataToSpreadSheet,
} = require("./googleSheetCRUD");
const { init, create } = require("./Config/connect");

//parameter {option}
router.post("/crud", async (req, res, next) => {
    const option = req.query.option;
    const { sheetCode, cellRange, jsonData } = req.body;
    switch (option) {
        case "create":
            const generatedSheetId = await create();
            const doc = await init(generatedSheetId);

            await makeNewMemberSheet(doc).then(() => {
                res.send(generatedSheetId);
            });
            break;
        case "write":
            console.log("접속");
            const spreadSheet = await init(sheetCode);
            console.log("init은 성공");
            await addDataToSpreadSheet(spreadSheet, cellRange, jsonData)
                .then(() => {
                    res.send("성공");
                })
                .catch(() => {
                    res.send("write 도중 오류가 발생했습니다.");
                });
            break;
    }
});

module.exports = router;

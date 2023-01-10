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
    const { sheetCode, startPos, data } = req.body;
    switch (option) {
        case "create":
            const generatedSheetId = await create();
            const doc = await init(generatedSheetId);

            await makeNewMemberSheet(doc, generatedSheetId).then(() => {
                res.send(generatedSheetId);
            });
            break;
        case "write":
            await addDataToSpreadSheet(sheetCode, startPos, data).then(() => {
                res.send("성공");
            });
            break;
    }
});

module.exports = router;

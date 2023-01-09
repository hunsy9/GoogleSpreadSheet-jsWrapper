const express = require("express");
const router = express.Router();

const googleApiRouter = require("./googleSheet/googleSheetController");

router.use("/google", googleApiRouter);

module.exports = router;

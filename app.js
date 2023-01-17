const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./option/corsOption");

const app = express();

const serviceRouter = require("./routes/service");

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use(cors({ origin: true }));
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/service", serviceRouter);
app.get("/", (req, res) => {
    res.send("Welcome");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(9443, function () {
    console.log("Server is running on port " + 9443);
});

module.exports = app;

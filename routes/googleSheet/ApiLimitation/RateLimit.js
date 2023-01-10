const RateLimit = require("express-rate-limit");

exports.apiLimiter = new RateLimit({
    windowMs: 60 * 1000, // 1분 간격
    max: 5, // windowMs동안 최대 호출 횟수
    handler(req, res) {
        res.status(this.statusCode).json({
            code: this.statusCode, // statusCode 기본값은 429
            message: "1분에 5번만 요청 할 수 있습니다.",
        });
    },
});

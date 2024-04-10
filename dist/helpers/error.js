"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.errorHandler = void 0;
const constants_1 = require("./constants");
Object.defineProperty(exports, "HTTP_STATUS", { enumerable: true, get: function () { return constants_1.HTTP_STATUS; } });
function errorHandler(res, err) {
    console.error(err);
    res
        .status(constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(`Internal Server Error: ${err.message}`);
}
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const errors_1 = require("../utils/errors");
const handleErrors = (err, req, res, next) => {
    if (err instanceof errors_1.GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            msg: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        msg: err.message,
    });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleErrors.js.map
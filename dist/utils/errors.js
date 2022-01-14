"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.Conflict = exports.NotFound = exports.BadRequest = exports.GeneralError = void 0;
class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof NotFound) {
            return 404;
        }
        if (this instanceof Conflict) {
            return 409;
        }
        if (this instanceof Forbidden) {
            return 403;
        }
        return 500;
    }
}
exports.GeneralError = GeneralError;
class BadRequest extends GeneralError {
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
}
exports.NotFound = NotFound;
class Conflict extends GeneralError {
}
exports.Conflict = Conflict;
class Forbidden extends GeneralError {
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=errors.js.map
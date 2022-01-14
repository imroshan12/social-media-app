"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = exports.JWT_EXPIRES = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET.toString();
exports.JWT_EXPIRES = process.env.JWT_EXPIRES.toString();
exports.PORT = process.env.PORT.toString();
exports.MONGO_URI = process.env.MONGO_URI.toString();
//# sourceMappingURL=keys.js.map
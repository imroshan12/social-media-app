"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../middlewares/auth");
const authController = __importStar(require("../controllers/authController"));
const router = express_1.default.Router();
// @route   GET api/auth
// @desc    get user
// Access   Public
router.get('/', auth_1.auth, authController.getUser);
// @route   POST api/auth
// @desc    Login user & get token
// Access   Public
router.post('/', [
    (0, express_validator_1.check)('email', 'Please enter a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').exists(),
], authController.loginUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
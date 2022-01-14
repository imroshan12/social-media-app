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
const checkObjectId_1 = __importDefault(require("../middlewares/checkObjectId"));
const router = express_1.default.Router();
const profileController = __importStar(require("../controllers/profileController"));
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth_1.auth, profileController.getMyProfile);
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth_1.auth, (0, express_validator_1.check)('status', 'Status is required').notEmpty(), (0, express_validator_1.check)('skills', 'Skills is required').notEmpty(), profileController.createProfile);
// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', profileController.getAllProfiles);
// @route    GET api/profile/query/:query
// @desc     Get profiles by query
// @access   Public
router.get('/query/:query?', profileController.getProfileByQuery);
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', (0, checkObjectId_1.default)('user_id'), profileController.getProfile);
// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth_1.auth, profileController.deleteAccount);
// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', auth_1.auth, (0, express_validator_1.check)('school', 'School is required').notEmpty(), (0, express_validator_1.check)('degree', 'Degree is required').notEmpty(), (0, express_validator_1.check)('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)), profileController.addEducation);
// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth_1.auth, profileController.deleteEducation);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map
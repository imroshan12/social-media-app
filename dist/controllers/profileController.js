"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.addEducation = exports.deleteAccount = exports.getProfileByQuery = exports.getProfile = exports.getAllProfiles = exports.createProfile = exports.getMyProfile = void 0;
const express_validator_1 = require("express-validator");
const postModel_1 = __importDefault(require("../models/postModel"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield profileModel_1.default.findOne({
        user: req.user.id,
    }).populate('user', [
        'name',
        'avatar',
        'friends',
        'pendingRequests',
        'receivedRequests',
    ]);
    if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
}));
exports.createProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const _a = req.body, { website, skills, youtube, twitter, instagram, linkedin, facebook } = _a, 
    // spread the rest of the fields we don't need to check
    rest = __rest(_a, ["website", "skills", "youtube", "twitter", "instagram", "linkedin", "facebook"]);
    // build a profile
    const profileFields = Object.assign({ user: req.user.id, skills: Array.isArray(skills)
            ? skills
            : skills.split(',').map((skill) => ' ' + skill.trim()) }, rest);
    if (!website) {
        profileFields.website = 'https://' + website;
    }
    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = value;
        //normalizeUrl(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;
    // Using upsert option (creates new doc if no match is found):
    const profile = yield profileModel_1.default.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true, upsert: true, setDefaultsOnInsert: true });
    const user = yield userModel_1.default.findById(req.user.id);
    user.profile = profile.id;
    yield user.save();
    return res.json(profile);
}));
exports.getAllProfiles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield profileModel_1.default.find().populate('user', [
        'name',
        'avatar',
        'friends',
        'pendingRequests',
        'receivedRequests',
    ]);
    res.json(profiles);
}));
exports.getProfile = (0, catchAsync_1.default)(({ params: { user_id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield profileModel_1.default.findOne({
        user: user_id,
    }).populate('user', [
        'name',
        'avatar',
        'friends',
        'pendingRequests',
        'receivedRequests',
    ]);
    if (!profile)
        return res.status(400).json({ msg: 'Profile not found' });
    return res.json(profile);
}));
exports.getProfileByQuery = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.params.query;
    const profiles = yield profileModel_1.default.find().populate('user', [
        'name',
        'avatar',
        'friends',
        'pendingRequests',
        'receivedRequests',
    ]);
    if (!query) {
        return res.json(profiles);
    }
    const filteredProfiles = profiles.filter((profile) => {
        const regex = new RegExp(query, 'gi');
        return profile.user.name.match(regex);
    });
    if (!filteredProfiles)
        return res.status(400).json({ msg: 'Profile not found' });
    return res.json(filteredProfiles);
}));
exports.deleteAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Remove user posts
    // Remove profile
    // Remove user
    yield Promise.all([
        postModel_1.default.deleteMany({ user: req.user.id }),
        profileModel_1.default.findOneAndRemove({ user: req.user.id }),
        userModel_1.default.findOneAndRemove({ _id: req.user.id }),
    ]);
    res.json({ msg: 'User deleted' });
}));
exports.addEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const profile = yield profileModel_1.default.findOne({ user: req.user.id });
    profile.education.unshift(req.body);
    yield profile.save();
    res.json(profile);
}));
exports.deleteEducation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProfile = yield profileModel_1.default.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter((edu) => edu._id.toString() !== req.params.edu_id);
    yield foundProfile.save();
    return res.status(200).json(foundProfile);
}));
//# sourceMappingURL=profileController.js.map
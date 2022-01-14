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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptFriendRequest = exports.sendFriendRequest = exports.searchUsers = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gravatar_1 = __importDefault(require("gravatar"));
const express_validator_1 = require("express-validator");
const keys_1 = require("../config/keys");
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    let user = yield userModel_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const avatar = 'https:' +
        gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
    user = new userModel_1.default({
        name,
        email,
        avatar,
        password,
    });
    const salt = yield bcryptjs_1.default.genSalt(10);
    user.password = yield bcryptjs_1.default.hash(password, salt);
    yield user.save();
    const payload = {
        user: {
            id: user.id,
        },
    };
    jsonwebtoken_1.default.sign(payload, keys_1.JWT_SECRET, { expiresIn: keys_1.JWT_EXPIRES }, (err, token) => {
        if (err)
            throw err;
        res.json({ token });
    });
}));
exports.searchUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchField = req.query.name;
    let users = yield userModel_1.default.find({
        name: { $regex: searchField, $options: 'i' },
    });
    //Find users having a profile field
    users = users.filter((user) => user.profile);
    res.status(200).json(users);
}));
exports.sendFriendRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.id === req.params.id) {
        return res.status(400).json({
            errors: [{ msg: 'You cannot send friend request to yourself' }],
        });
    }
    const user = yield userModel_1.default.findById(req.user.id);
    const friend = yield userModel_1.default.findById(req.params.id);
    if (!user || !friend) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
    if (user.friends.includes(friend.id)) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'User is already your friend' }] });
    }
    const findPendingRequests = user.pendingRequests.find((x) => x.id === friend.id);
    const findReceivedRequests = user.receivedRequests.find((x) => x.id === friend.id);
    if (findPendingRequests) {
        return res.status(400).json({
            errors: [{ msg: 'You have already sent friend request to this user' }],
        });
    }
    if (findReceivedRequests) {
        return res.status(400).json({
            errors: [
                { msg: 'You have already received friend request from this user' },
            ],
        });
    }
    user.pendingRequests.push(friend.id);
    friend.receivedRequests.push(user.id);
    yield user.save();
    yield friend.save();
    res.status(202).json({ msg: 'Friend request sent' });
}));
exports.acceptFriendRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user.id);
    const friend = yield userModel_1.default.findById(req.params.id);
    if (!user || !friend) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
    if (!user.friends.includes(friend.id)) {
        user.friends.push(friend.id);
        friend.friends.push(user.id);
        friend.pendingRequests = friend.pendingRequests.filter((x) => x.id.toString() !== user.id.toString());
        user.receivedRequests = user.receivedRequests.filter((x) => x.id.toString() !== friend.id.toString());
        yield user.save();
        yield friend.save();
        res.status(202).json({ msg: 'Friend request accepted' });
    }
    res.status(400).json({ errors: [{ msg: 'User is already your friend' }] });
}));
//# sourceMappingURL=userController.js.map
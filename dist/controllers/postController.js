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
exports.deleteComment = exports.editComment = exports.addComment = exports.unlikePost = exports.likePost = exports.deletePost = exports.editPost = exports.getPost = exports.getAllPosts = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../models/userModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = yield userModel_1.default.findById(req.user.id).select('-password');
    const postData = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        image: '',
    };
    if (req.files) {
        const file = req.files.file;
        file.name = (0, uuid_1.v4)() + file.name.slice(-4);
        yield file.mv(`C:/hv-bootcamp/social-media-app/client/public/uploads/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
        postData.image = `/uploads/${file.name}`;
    }
    const newPost = new postModel_1.default(postData);
    const post = yield newPost.save();
    res.json(post);
}));
exports.getAllPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postModel_1.default.find().sort({ date: -1 });
    res.json(posts);
}));
exports.getPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
}));
exports.editPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }
    //Update the post
    post.text = req.body.text;
    if (req.files) {
        const file = req.files.file;
        file.name = (0, uuid_1.v4)() + file.name.slice(-4);
        yield file.mv(`C:/hv-bootcamp/social-media-app/client/public/uploads/${file.name}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
        post.image = `/uploads/${file.name}`;
    }
    else {
        post.image = '';
    }
    //Save the post
    yield post.save();
    res.json(post);
}));
exports.deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }
    yield post.remove();
    res.json({ msg: 'Post removed' });
}));
exports.likePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    yield post.save();
    return res.json(post.likes);
}));
exports.unlikePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // remove the like
    post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
    yield post.save();
    return res.json(post.likes);
}));
exports.addComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = yield userModel_1.default.findById(req.user.id).select('-password');
    const post = yield postModel_1.default.findById(req.params.id);
    const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
    };
    post.comments.unshift(newComment);
    yield post.save();
    res.json(post.comments);
}));
exports.editComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const post = yield postModel_1.default.findById(req.params.id);
    // Pull out comment
    const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
    // Make sure comment exists
    if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }
    comment.text = req.body.text;
    yield post.save();
    return res.json(post.comments);
}));
exports.deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    // Pull out comment
    const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
    // Make sure comment exists
    if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }
    post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id);
    yield post.save();
    return res.json(post.comments);
}));
//# sourceMappingURL=postController.js.map
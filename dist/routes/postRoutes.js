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
const postController = __importStar(require("../controllers/postController"));
const router = express_1.default.Router();
// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post('/', auth_1.auth, (0, express_validator_1.check)('text', 'Text is required').notEmpty(), postController.createPost);
// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth_1.auth, postController.getAllPosts);
// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth_1.auth, (0, checkObjectId_1.default)('id'), postController.getPost);
// @route    PUT api/posts/:id
// @desc     Update a post
// @access   Private
router.put('/:id', auth_1.auth, (0, checkObjectId_1.default)('id'), (0, express_validator_1.check)('text', 'Text is required').notEmpty(), postController.editPost);
// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth_1.auth, (0, checkObjectId_1.default)('id')], postController.deletePost);
// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth_1.auth, (0, checkObjectId_1.default)('id'), postController.likePost);
// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth_1.auth, (0, checkObjectId_1.default)('id'), postController.unlikePost);
// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:id', auth_1.auth, (0, checkObjectId_1.default)('id'), (0, express_validator_1.check)('text', 'Text is required').notEmpty(), postController.addComment);
// @route    PUT api/posts/comment/:id/:comment_id
// @desc     Edit comment
// @access   Private
router.put('/comment/:id/:comment_id', auth_1.auth, (0, express_validator_1.check)('text', 'Text is required').notEmpty(), postController.editComment);
// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth_1.auth, postController.deleteComment);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map
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
const userController = __importStar(require("../controllers/userController"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', (0, express_validator_1.check)('name', 'Name is required').notEmpty(), (0, express_validator_1.check)('email', 'Please include a valid email').isEmail(), (0, express_validator_1.check)('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }), userController.registerUser);
// @route    GET api/users
// @desc     Get users by query
// @access   Public
router.get('/search', userController.searchUsers);
// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/send-request/:id', auth_1.auth, userController.sendFriendRequest);
// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/accept-request/:id', auth_1.auth, userController.acceptFriendRequest);
// // Send friend request
// router.post('/sendfriendrequest', auth, async (req, res) => {
//   const userId = req.user.id;
//   const { recipientId } = req.body;
//   const foundFriendRequest = await FriendRequest.findOne({
//     sender: userId,
//     recipient: recipientId,
//   });
//   if (foundFriendRequest) {
//     return res.status(400).send();
//   }
//   const newFriendRequest = new FriendRequest({
//     sender: userId,
//     recipient: recipientId,
//     status: 'pending',
//   });
//   newFriendRequest
//     .save()
//     .then((result) => {
//       res.status(201).send(result);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });
// // get friend requests of current user
// router.get('/getfriendrequests/:id', async (req, res) => {
//   const requests = await FriendRequest.find({
//     recipient: req.params.id,
//   });
//   res.status(200).send(requests);
// });
// // get single friend request by id, returns true or false
// // determines if current user has pending or existing
// // friend request with owner of profile being viewed
// router.get('/getfriendrequest/', auth, async (req, res) => {
//   const { profileUserId } = req.query;
//   const userId = req.user.id;
//   const foundFriendRequest1 = await FriendRequest.findOne({
//     sender: userId,
//     recipient: profileUserId,
//   });
//   const foundFriendRequest2 = await FriendRequest.findOne({
//     sender: profileUserId,
//     recipient: userId,
//   });
//   let friendRequestAlreadyExists = false;
//   if (foundFriendRequest1 || foundFriendRequest2) {
//     friendRequestAlreadyExists = true;
//   }
//   res.send(friendRequestAlreadyExists);
// });
// router.post('/acceptfriendrequest', auth, async (req, res) => {
//   const recipientId = req.user.id;
//   const senderId = req.body.sender;
//   const updatedSender = await User.findOneAndUpdate(
//     { _id: senderId, friendList: { $nin: [recipientId] } },
//     { $push: { friendList: recipientId } },
//     { new: true }
//   );
//   const updatedRecipient = await User.findOneAndUpdate(
//     { _id: recipientId, friendList: { $nin: [senderId] } },
//     {
//       $push: { friendList: senderId },
//     },
//     { new: true }
//   );
//   if (updatedRecipient) {
//     const updatedFriendRequest = await FriendRequest.findOneAndUpdate(
//       {
//         sender: senderId,
//         recipient: recipientId,
//       },
//       {
//         $set: { status: 'accepted' },
//         $push: { friendshipParticipants: [senderId, recipientId] },
//       },
//       { new: true }
//     );
//     const updatedRequests = await FriendRequest.find({
//       recipient: req.user.id,
//       status: 'pending',
//     });
//     res.status(200).send({
//       updatedRequests: updatedRequests,
//       updatedUserFriendList: updatedRecipient.friendList,
//     });
//   }
// });
// router.post('/rejectfriendrequest', auth, async (req, res) => {
//   const recipientId = req.user.id;
//   const senderId = req.body.sender;
//   const deletedFriendRequest = await FriendRequest.findOneAndDelete({
//     sender: senderId,
//     recipient: recipientId,
//   });
//   const updatedRequests = await FriendRequest.find({
//     recipient: req.user.id,
//     status: 'pending',
//   });
//   res.status(200).send({
//     updatedRequests: updatedRequests,
//   });
// });
// router.post('/unfriend', auth, async (req, res) => {
//   const userId = req.user.id;
//   const { friendId } = req.body;
//   const updatedUser = await User.findOneAndUpdate(
//     { _id: userId },
//     { $pullAll: { friendList: [friendId] } },
//     { new: true }
//   ).select('-password');
//   const updatedFriend = await User.findOneAndUpdate(
//     { _id: friendId },
//     { $pullAll: { friendList: [userId] } },
//     { new: true }
//   ).select('-password');
//   const deletedFriendRequest = await FriendRequest.findOneAndDelete({
//     $and: [
//       { friendshipParticipants: { $in: [friendId] } },
//       { friendshipParticipants: { $in: [userId] } },
//     ],
//   });
//   res.status(200).send({ updatedUser, updatedFriend });
// });
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
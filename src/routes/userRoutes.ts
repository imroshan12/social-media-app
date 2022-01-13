import express from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/userController';
import { auth } from '../middlewares/auth';
import User from '../models/userModel';

const router = express.Router();

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 8 or more characters'
  ).isLength({ min: 8 }),
  userController.registerUser
);

// @route    GET api/users
// @desc     Get users by query
// @access   Public
router.get('/search', userController.searchUsers);

// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/send-request/:id', auth, userController.sendFriendRequest);

// @route    POST api/users/send-request/:id
// @desc     Send friend request
// @access   Private
router.put('/accept-request/:id', auth, userController.acceptFriendRequest);

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

export default router;

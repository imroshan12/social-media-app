import { model, Schema } from 'mongoose';

const friendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
    },
    friendshipParticipants: {
      type: [Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

const FriendRequest = model('FriendRequest', friendRequestSchema);

export default FriendRequest;

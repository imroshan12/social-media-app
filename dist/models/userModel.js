"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
// interface IFriend extends Document {
//   user: {
//     type: Schema.Types.ObjectId;
//   };
// }
// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   avatar: string;
//   friends: IFriend[];
//   pendingRequests: IFriend[];
//   receivedRequests: IFriend[];
//   date: Date;
// }
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
    },
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    friends: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
        },
    ],
    pendingRequests: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
        },
    ],
    receivedRequests: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
        },
    ],
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
// friends: {
//   type: [Schema.Types.ObjectId],
//   ref: 'User',
// },
//# sourceMappingURL=userModel.js.map
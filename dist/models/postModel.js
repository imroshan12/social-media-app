"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// interface ILike extends Document {
//   user: Schema.Types.ObjectId;
// }
// interface IComment extends Document {
//   user: Schema.Types.ObjectId;
//   post: Schema.Types.ObjectId;
//   name: string;
//   avatar: string;
//   date: Date;
// }
// interface IPost extends Document {
//   user: Schema.Types.ObjectId;
//   text: string;
//   name: string;
//   avatar: string;
//   likes: ILike[];
//   comments: IComment[];
//   date: Date;
// }
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
//# sourceMappingURL=postModel.js.map
import { Schema, Document, model } from 'mongoose';

// interface IEducation extends Document {
//   school: string;
//   degree: string;
//   fieldofstudy: string;
//   from: Date;
//   to: Date;
//   current: boolean;
//   description: string;
// }

// interface ISocial extends Document {
//   youtube: string;
//   twitter: string;
//   instagram: string;
//   linkedin: string;
//   facebook: string;
// }

// interface IProfile extends Document {
//   user: Schema.Types.ObjectId;
//   company: string;
//   website: string;
//   location: string;
//   status: string;
//   skills: string[];
//   bio: string;
//   education: IEducation[];
//   social: ISocial;
//   date: Date;
// }

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = model('Profile', profileSchema);

export default Profile;

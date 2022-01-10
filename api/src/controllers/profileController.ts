import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/postModel';
import Profile from '../models/profileModel';
import User from '../models/userModel';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

export const getMyProfile = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const profile = await Profile.findOne({
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createProfile = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructure the request
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user.id,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    ...rest,
  };
  if (!website) {
    profileFields.website = 'https://' + website;
  }

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) socialFields[key] = value;
    //normalizeUrl(value, { forceHttps: true });
  }
  // add to profileFields
  profileFields.social = socialFields;

  try {
    // Using upsert option (creates new doc if no match is found):
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    const user = await User.findById(req.user.id);
    user.profile = profile.id;
    await user.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

export const getAllProfiles = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'friends',
      'pendingRequests',
      'receivedRequests',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getProfile = async ({ params: { user_id } }, res) => {
  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate('user', [
      'name',
      'avatar',
      'friends',
      'pendingRequests',
      'receivedRequests',
    ]);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const getProfileByQuery = async (req, res) => {
  try {
    const query = req.params.query;
    const profiles = await Profile.find().populate('user', [
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
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteAccount = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const addEducation = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteEducation = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

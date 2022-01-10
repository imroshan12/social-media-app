import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, friends, receivedRequests, pendingRequests },
    status,
    skills,
    company,
    location,
  },
}) => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profiles/${_id}`} className='btn btn-success'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-info'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

// friends.filter((friend) => {
//   return friend._id !== auth.user._id;
// }) &&

// {!friends ? (
//   <button className='btn btn-info'>Add friend</button>
// ) : friends.filter((friend) => {
//     console.log(friend.id);
//     return friend._id === _id;
//   }) ? (
//   <button className='btn btn-info'>Add friend</button>
// ) : (
//   <button className='btn btn-info'>Friends</button>
// )}

export default ProfileItem;

import React, { Fragment, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import {
  acceptRequest,
  getProfileByID,
  sendRequest,
} from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';

const Profile = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const profile = useSelector((state: RootStateOrAny) => state.profile.profile);
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  useEffect(() => {
    dispatch(getProfileByID(id));
  }, [dispatch, id]);

  const sendRequestHandler = (e) => {
    dispatch(sendRequest(id));
    console.log('add friend');
  };

  const acceptRequestHandler = (e) => {
    dispatch(acceptRequest(id));
    console.log('accept friend');
  };
  return (
    <section className='container'>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <Fragment>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user.friends.find(
                (friend) =>
                  friend._id.toString() === profile.user._id.toString()
              ) && <button className='btn btn-info'>Friend</button>}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user.pendingRequests.find(
                (pending_request) =>
                  pending_request._id.toString() === profile.user._id.toString()
              ) && <button className='btn btn-info'>Request sent</button>}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user.receivedRequests.find(
                (received_request) =>
                  received_request._id.toString() ===
                  profile.user._id.toString()
              ) && (
                <button onClick={acceptRequestHandler} className='btn btn-info'>
                  Accept Request{' '}
                </button>
              )}
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id !== profile.user._id &&
              !auth.user.friends.find(
                (friend) =>
                  friend._id.toString() === profile.user._id.toString()
              ) &&
              !auth.user.receivedRequests.find(
                (received_request) =>
                  received_request._id.toString() ===
                  profile.user._id.toString()
              ) &&
              !auth.user.pendingRequests.find(
                (pending_request) =>
                  pending_request._id.toString() === profile.user._id.toString()
              ) && (
                <button onClick={sendRequestHandler} className='btn btn-info'>
                  Add friend
                </button>
              )}
          </Fragment>
          <div className='profile-grid my-1'>
            {console.log(auth.user)}
            <ProfileTop />
            <ProfileAbout />
            <div className='profile-experience bg-white p-2'>
              <h2 className='text-success'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

// {auth.user && auth.user._id !== _id && (
//   <Fragment>
//     {auth.user.friends.filter((friend) => {
//       console.log(friend._id === _id);

//       return friend._id === _id;
//     }) ? (
//       <button className='btn btn-info'>Friend</button>
//     ) : (
//       <button className='btn btn-info'>Add friend</button>
//     )}

//     <button className='btn btn-success'>Accept</button>
//     <button className='btn btn-warning'>Cancel</button>
//   </Fragment>
// )}
// {console.log(_id)}
// {console.log(auth.user)}

export default Profile;

import React, { Fragment, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import { getProfileByID } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';

const Profile = () => {
  const id = useParams().id;
  console.log(id);
  const dispatch = useDispatch();
  const profile = useSelector((state: RootStateOrAny) => state.profile.profile);
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  useEffect(() => {
    dispatch(getProfileByID(id));
  }, [dispatch, id]);
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
          {auth.user.friends.filter((friend) => {
            return friend._id === profile.user._id;
          }) ? (
            <button className='btn btn-info'>Friend</button>
          ) : (
            <button className='btn btn-info'>Add friend</button>
          )}
          <div className='profile-grid my-1'>
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

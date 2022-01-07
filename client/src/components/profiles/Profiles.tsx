import React, { useEffect, Fragment } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(
    (state: RootStateOrAny) => state.profile
  );
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>People</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            people around the world
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;

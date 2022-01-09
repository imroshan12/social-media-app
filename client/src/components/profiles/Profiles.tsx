import React, { useEffect, Fragment, useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(
    (state: RootStateOrAny) => state.profile
  );
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-success'>People</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            people around the world
          </p>
          <div className='mb-3'>
            <input
              type='text'
              placeholder='Search..'
              className='form-control'
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className='profiles'>
            {/* {console.log(profiles.length)} */}
            {profiles ? (
              profiles
                .filter((profile) => {
                  if (searchTerm === '') return profile;
                  return profile.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
                .map((profile) => (
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

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Landing = () => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    // console.log(isAuthenticated);
    return <Navigate to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Socializing people</h1>
          <p className='lead'>
            Come, meet, and make new friends from around the world
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

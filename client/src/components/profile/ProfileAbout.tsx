import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const ProfileAbout = () => {
  const { bio, skills, user } = useSelector(
    (state: RootStateOrAny) => state.profile.profile
  );
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-success'>{user.name.trim().split(' ')[0]} Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
            neque modi perspiciatis similique?
          </p>
          <div className='line'></div>
        </Fragment>
      )}
      <h2 className='text-success'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check' /> {skill}
          </div>
        ))}
        <div className='p-1'>
          <i className='fa fa-check'></i> HTML
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> CSS
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> JavaScript
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> Python
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> C#
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;

import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  const { _id } = useSelector((state: RootStateOrAny) => state.auth.user);
  return (
    <div className='dash-buttons'>
      <Link to={`/profiles/${_id}`} className='btn btn-success'>
        View Profile
      </Link>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-info' /> Edit Profile
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-info' /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;

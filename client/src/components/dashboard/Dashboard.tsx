import { Fragment, useEffect } from 'react';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { profile, loading } = useSelector(
    (state: RootStateOrAny) => state.profile
  );
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  //   dispatch(getCurrentProfile());
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />\
          <Education />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

export default Dashboard;

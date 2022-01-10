// import { Link } from "react-router-dom";
import { Fragment } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import logo from '../../img/socialBook.png';
import '../../App.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i>{' '}
          <span className='hide-sm'>People</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fas fa-mail-bulk'></i>{' '}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href='/login'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i>{' '}
          <span className='hide-sm'>People</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fas fa-plus'></i>{' '}
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fas fa-sign-in-alt'></i>{' '}
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-social'>
      <h1>
        <Link to='/'>
          <img className='nav-logo' src={logo} alt='logo' width='1%'></img>{' '}
          <span>SocialBook</span>
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;

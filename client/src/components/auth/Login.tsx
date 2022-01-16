import isEmpty from 'validator/lib/isEmpty';
import React, { Fragment } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import isEmail from 'validator/lib/isEmail';
import { setAlert } from '../../actions/alert';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (isEmail(email) && !isEmpty(password)) {
      dispatch(login(email, password));
    } else {
      dispatch(setAlert('All fields are required', 'danger'));
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Navigate to='/posts' />;
  }
  return (
    <Fragment>
      <h1 className='large text-success'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form className='form' onSubmit={onSubmitHandler} noValidate>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeHandler}
            minLength={8}
          />
        </div>
        <input
          type='submit'
          className='btn btn-outline-success'
          value='Login'
        />
      </form>
      <p className='my-1'>
        Don't have a account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;

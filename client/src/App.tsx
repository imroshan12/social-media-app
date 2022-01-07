import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
//REDUX
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';
import AddEducation from './components/profile-forms/AddEducation';
import Post from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/profiles/:id' element={<Profile />} />
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route path='/create-profile' element={<PrivateRoute />}>
                <Route path='/create-profile' element={<ProfileForm />} />
              </Route>
              <Route path='/edit-profile' element={<PrivateRoute />}>
                <Route path='/edit-profile' element={<ProfileForm />} />
              </Route>
              <Route path='/add-education' element={<PrivateRoute />}>
                <Route path='/add-education' element={<AddEducation />} />
              </Route>
              <Route path='/posts' element={<PrivateRoute />}>
                <Route path='/posts' element={<Posts />} />
              </Route>
              <Route path='/posts/:id' element={<PrivateRoute />}>
                <Route path='/posts/:id' element={<Post />} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

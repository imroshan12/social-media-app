import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_QUERY_PROFILES,
} from '../action-types/profile';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:8000/api/v1/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('http://localhost:8000/api/v1/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const getProfilesByQuery = (query) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/profile/query/${query}`
    );

    dispatch({
      type: GET_QUERY_PROFILES,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const getProfileByID = (userID) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/profile/user/${userID}`
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/profile',
        formData
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addEducation = (formData, navigate) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      'http://localhost:8000/api/v1/profile/education',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    navigate('/dashboard');
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/profile/education/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('http://localhost:8000/api/v1/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted', 'danger'));
    } catch (err: any) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const sendRequest = (id) => async (dispatch) => {
  try {
    const res1 = await axios.put(
      `http://localhost:8000/api/v1/users/send-request/${id}`
    );

    const res2 = await axios.get(
      `http://localhost:8000/api/v1/profile/user/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res2.data,
    });

    dispatch(setAlert('Friend request sent', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const acceptRequest = (id) => async (dispatch) => {
  try {
    const res1 = await axios.put(
      `http://localhost:8000/api/v1/users/accept-request/${id}`
    );

    const res2 = await axios.get(
      `http://localhost:8000/api/v1/profile/user/${id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res2.data,
    });

    dispatch(setAlert('Friend request accepted', 'success'));
  } catch (err: any) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

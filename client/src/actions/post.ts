import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  EDIT_POST,
  EDIT_COMMENT,
} from '../action-types/post';

//GET POSTS ACTION
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//GET POST ACTION
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//LIKE POST ACTION
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//UNLIKE POST ACTION
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//DELETE POST ACTION
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//EDIT POST ACTION
export const editPost = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.put(`/api/v1/posts/${id}`, formData, config);
    dispatch({
      type: EDIT_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Updated', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//ADD POST ACTION
export const addPost = (formData) => async (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const res = await axios.post('/api/v1/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//ADD COMMENT ACTION
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/v1/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//ADD COMMENT ACTION
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/v1/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment deleted', 'success'));
  } catch (err: any) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

//ADD COMMENT ACTION
export const editComment =
  (postId, commentId, formData) => async (dispatch) => {
    const data = {
      text: formData,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/v1/posts/comment/${postId}/${commentId}`,
        data,
        config
      );
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert('Comment deleted', 'success'));
    } catch (err: any) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  };

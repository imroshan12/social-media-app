import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import {
  addLike,
  deletePost,
  editPost,
  getPosts,
  removeLike,
} from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, date, comments, likes, image },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const [edit, setEdit] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [file, setFile] = useState(image);
  const [fileName, setFileName] = useState(image);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onClick = (e) => {
    const formData = new FormData();
    formData.append('text', textValue);
    formData.append('file', file);
    dispatch(editPost(_id, formData));
    setEdit(false);
  };

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {!edit ? (
          <Fragment>
            {image && <img style={{ width: '50%' }} src={image} alt='post' />}
            <p className='my-1'>{text}</p>
          </Fragment>
        ) : (
          <div className='mb-4'>
            <label className='form-label' htmlFor='customFile'>
              Upload image
            </label>
            <input
              type='file'
              className='form-control'
              id='customFile'
              onChange={onChange}
            />
            <input
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              value={textValue}
              type='text'
              className='my-1 form-control'
            />
          </div>
        )}
        <p className='post-date'>Posted on {formatDate(date)}</p>

        {/* {showActions && ( */}
        <Fragment>
          <button
            onClick={(e) => dispatch(addLike(_id))}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => dispatch(removeLike(_id))}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-success'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => dispatch(deletePost(_id))}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
          {!auth.loading && user === auth.user._id && (
            <Fragment>
              {
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  type='button'
                  className='btn btn-warning'
                >
                  <i className='fas fa-edit' />
                </button>
              }
              {edit && (
                <button
                  onClick={onClick}
                  type='submit'
                  className='btn btn-info'
                >
                  <i className='fas fa-check' />
                </button>
              )}
            </Fragment>
          )}
        </Fragment>
        {/* )} */}
      </div>
    </div>
  );
};

export default PostItem;

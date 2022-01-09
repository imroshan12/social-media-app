import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { addLike, deletePost, removeLike } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, date, comments, likes, image },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        {image && <img style={{ width: '100%' }} src={image} alt='post' />}
        <p className='my-1'>{text}</p>
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
        </Fragment>
        {/* )} */}
      </div>
    </div>
  );
};

export default PostItem;

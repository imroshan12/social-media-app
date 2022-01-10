import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment, editComment } from '../../actions/post';
import formatDate from '../../utils/formatDate';

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const [edit, setEdit] = useState(false);
  const [textValue, setTextValue] = useState(text);
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
          <p className='my-1'>{text}</p>
        ) : (
          <input
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
            value={textValue}
            type='text'
            className='my-1 form-control'
          />
        )}
        <p className='post-date'>Posted on {formatDate(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
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
                onClick={() => {
                  dispatch(editComment(postId, _id, textValue));
                  setEdit(false);
                }}
                type='submit'
                className='btn btn-info'
              >
                <i className='fas fa-check' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

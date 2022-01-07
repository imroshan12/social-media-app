import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state: RootStateOrAny) => state.post);
  const id = useParams().id;
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

export default Post;

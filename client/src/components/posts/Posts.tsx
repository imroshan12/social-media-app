import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: any) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-success'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      <div className='posts mt-3'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('file', file);
    dispatch(addPost(formData));
    setText('');
    setFile('');
  };

  return (
    <div className='post-form pb-3'>
      <div className='bg-success p'>
        <h3>Say Something...</h3>
      </div>
      <div style={{ border: '1px solid black', padding: '3%' }}>
        <form className='form my-1' onSubmit={onSubmit}>
          <textarea
            name='text'
            cols={30}
            rows={5}
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
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
          </div>
          <input type='submit' className='btn btn-dark my-1' value='Post' />
        </form>
      </div>
    </div>
  );
};

export default PostForm;

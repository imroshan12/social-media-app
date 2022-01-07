import formatDate from '../../utils/formatDate';
import { RootStateOrAny, useSelector } from 'react-redux';

const ProfileEducation = ({
  education: { school, from, to, degree, fieldofstudy, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description: </strong> {description}
        </p>
      )}
    </div>
  );
};

export default ProfileEducation;

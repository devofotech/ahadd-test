import { useState } from 'react';
import { initialsFromUser, isValidHttpUrl } from '@Helpers';

let style = {
  width: '2.5em',
  height: '2.5em',
  borderRadius: '50%',
  fontSize: '12px',
  backgroundColor: '#512DA8',
  color: 'white',
  objectFit: 'cover',
  marginRight: '10px',
  boxShadow: '2px 2px 4px 1px rgba(0,0,0,0.1)',
};

export default function Avatar(props) {
  const [hasImage, setHasImage] = useState(true);

  style = { ...style, ...(props.style || {}) };
  if (!hasImage) return <div className="flex-standard" style={style}>{initialsFromUser(props)}</div>;

  return (
    <img
      src={props.image ? isValidHttpUrl(props.image) ? props.image : `${process.env.REACT_APP_S3}/${props.image}` : `https://d37bxaq5q1mz6s.cloudfront.net/User/${props.EMPLOYEE_NUMBER}.jpg`}
      style={style}
      onError={() => setHasImage(false)}
    />
  );
}

import React, { useState, useRef } from 'react';
import { Box, Avatar, IconButton } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAlt';
import DeleteIcon from '@material-ui/icons/Clear';

export default ({ currentImage, setPhoto }) => {
  const imageUpload = useRef(null);
  const [onHover, setOnHover] = useState(false);
  const [imageData, setImageData] = useState(null);
  const onClickUpload = () => imageUpload.current.click();
  const onUploadImage = e => {
    if (e.target.files[0]) {
      setPhoto([e.target.files[0]]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Box className="d-flex align-items-center flex-column position-relative">
      <Box
        className="position-relative rounded-circle"
        style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={onClickUpload}
      >
        <IconButton className="position-absolute rounded-circle bg-white shadow-sm" style={{ bottom: 0, right: -5, zIndex: 10 }}>
          <CameraIcon style={{ fontSize: '1rem' }} />
        </IconButton>
        {onHover && (
          <CameraIcon
            className="position-absolute"
            style={{
              height: '50%', width: '50%', zIndex: 11, top: 30, left: 30, color: 'rgba(255, 255, 255, 0.3)',
            }}
          />
        )}
        <Avatar src={imageData ?? currentImage} style={{ height: 120, width: 120, opacity: onHover && 0.7 }} />
      </Box>
      {/* {!!imageData && (
        <IconButton
          className="position-absolute"
          style={{
            top: -10, right: 90, zIndex: 10, transform: 'scale(0.6)',
          }}
          onClick={() => { setImageData(); setPhoto([]); }}
        >
          <DeleteIcon style={{ fontSize: '1.5rem', color: 'red' }} />
        </IconButton>
      )} */}
      <input
        type="file"
        name="upload-image"
        accept="image/*"
        ref={imageUpload}
        onChange={onUploadImage}
        style={{ visibility: 'hidden' }}
      />
    </Box>
  );
};

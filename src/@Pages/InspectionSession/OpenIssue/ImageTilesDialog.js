import React, { useState } from 'react';
import {
  Grid, Dialog, DialogTitle, DialogContent, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Clear';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

const styles = {
  image: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    backgroundSize: 'cover',
    cursor: 'pointer',
  },
};

export default ({
  open, onClose = () => null, annotations, onClickImage,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>
        Resolve Open Cases
        <div className="text-secondary" style={{ fontSize: 14 }}>Upload supporting document to verify and close the cases</div>
        <IconButton onClick={onClose} style={{ right: 10, top: 10, position: 'absolute' }}>
          <CloseIcon style={{ fontSize: 16 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent className="mb-4">
        <Grid container item xs={12} style={{ minHeight: '60vh' }}>
          {annotations.map((m, index) => (
            <ImageCard onClickImage={onClickImage} index={index} {...m} />
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const ImageCard = ({
  onClickImage, setSelectedInspectionId, index, ...props
}) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => { setHover(!hover); };
  const handleMouseLeave = () => { setHover(!hover); };
  return (
    <Grid xs={6} sm={3} lg={2} className="mt-2">
      <div
        className="mx-2 mb-2 position-relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClickImage(index)}
      >
        {(!props.is_compliance && !props.is_close) && (
          <AssignmentLateIcon
            className="position-absolute p-1"
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 50, color: 'red', bottom: 10, right: 10, zIndex: 20, width: 15, height: 15,
            }}
          />
        )}
        <div
          style={{
            ...styles.image,
            backgroundImage: `url(${process.env.REACT_APP_S3}/${props.path})`,
            ...(hover && {
              transitionDuration: '0.25s',
              transform: 'scale(1.02)',
            }),
            border: `4px solid ${props.color}`,
          }}
          loading="lazy"
        />
      </div>
    </Grid>
  );
};

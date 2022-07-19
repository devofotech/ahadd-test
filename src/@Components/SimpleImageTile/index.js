import React, { useState } from 'react';
import AutoRotatingCarouselModal from '@Components/PhotoSlider';
import {
  Grid,
} from '@material-ui/core';

export default function SimpleImageTile(props) {
  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = (idx) => {
    setHandleOpen({ open: true, idx });
  };
  return (
    <div style={{ overflow: 'hidden' }}>
      <Grid container spacing={2} style={{ padding: '5px', maxHeight: 400, overflowY: 'scroll' }}>
        {props.images?.map((item, idx) => (
          <Grid item xs={6} md={4} style={{ padding: '5px' }}>
            <img
              onClick={() => handleClick(idx)}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
              src={item.path}
              loading="lazy"
            />
          </Grid>
        ))}
      </Grid>
      <AutoRotatingCarouselModal
        image={props.images}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
      />
    </div>
  );
}

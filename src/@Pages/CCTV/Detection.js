import React, { useState, useEffect } from 'react';
import {
  Box, Grid,
} from '@material-ui/core';
import DetectionList from './components/DetectionList';
import DisplayInfo from './components/DisplayInfo';

export default ({ footage_detection: footage, getNextPageFootage }) => {
  const [displayed_image, set_displayed_image] = useState(footage.data[0]);
  const onBottomVerticalSlider = () => getNextPageFootage(footage.page ? footage.page + 1 : footage.current_page + 1);

  useEffect(() => {
    set_displayed_image(footage.data.length ? footage.data[0] : {})
  }, [footage]);

  return (
    <Box className="d-flex pr-2 my-auto">
      <Grid xs={12} md={10}>
        <Box className="mr-2" style={{ position: 'relative' }}>
          <img
            src={`${process.env.REACT_APP_S3}/${displayed_image?.path}`}
            alt="View of "
            style={{
              objectFit: 'cover', width: '100%', aspectRatio: '4/2', borderRadius: 10,
            }}
          />
          <DisplayInfo {...displayed_image} />
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={2}
        style={{
          position: 'relative', overflowY: 'scroll', overflowX: 'hidden', height: '53.5vh',
        }}
      >
        <DetectionList
          footage={footage.data}
          onBottomVerticalSlider={onBottomVerticalSlider}
          displayed_image={displayed_image}
          set_displayed_image={set_displayed_image}
        />
      </Grid>
    </Box>
  );
};

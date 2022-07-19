import { useState, useEffect } from 'react';
import {
  Typography, Box, Slider, IconButton,
} from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';

export default ({ footage }) => {
  const [current_slider_key, set_current_slider_key] = useState(footage.length - 1);
  const [displayed_image, set_displayed_image] = useState(footage[footage.length - 1]?.path);

  useEffect(() => {
    set_displayed_image(footage.length ? footage[footage.length - 1]?.path : '');
    set_current_slider_key(footage.length ? footage.length - 1 : 0);
  }, [footage]);

  const onChangeTracker = (e, csk) => {
    set_current_slider_key(csk);
    const selectedImage = footage[csk];
    set_displayed_image(selectedImage.path);
  };

  const handleNext = () => {
    if (current_slider_key >= footage.length - 1) return;
    const selectedImage = footage[current_slider_key + 1];
    set_displayed_image(selectedImage.path);
    set_current_slider_key(current_slider_key + 1);
  };

  const handlePrev = () => {
    if (current_slider_key <= 0) return;
    const selectedImage = footage[current_slider_key - 1];
    set_displayed_image(selectedImage.path);
    set_current_slider_key(current_slider_key - 1);
  };

  return (
    <Box className="mt-2" style={{ background: 'rgba(249, 206, 10, 0.15)', position: 'relative' }}>
      <img
        src={`${process.env.REACT_APP_S3}/${displayed_image}`}
        alt="View of "
        style={{ objectFit: 'cover', width: '100%', aspectRatio: '4/2' }}
      />

      <Box className="d-flex px-4 my-auto" style={{ background: 'rgb(249, 206, 10)' }}>
        <Typography className="mt-2">
          {moment(footage[0].captureAt).format('YYYY')}
        </Typography>
        <Box className="w-100 mt-1 px-4">
          <TimeSlider
            defaultValue={current_slider_key}
            step={1}
            marks={footage}
            min={0}
            max={footage.length - 1}
            onChangeCommitted={onChangeTracker}
            key={current_slider_key}
            valueLabelDisplay="off"
          />
        </Box>
        <Typography className="mt-2">
          {moment(footage[footage.length - 1].captureAt).format('YYYY')}
        </Typography>
        <Box className="d-flex" style={{ marginTop: -3 }}>
          <IconButton onClick={handlePrev}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={handleNext}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
      {/* <InfoCard {...h} /> */}
    </Box>
  );
};

const TimeSlider = styled(Slider)(() => ({
  color: 'transparent',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    marginTop: -6,
    height: 15,
    width: 15,
    backgroundColor: 'rgb(249, 206, 10)',
    border: '1px solid black',
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'black',
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'black',
    marginTop: -3,
    marginBottom: 0,
    borderRadius: 40,
    height: 8,
    width: 8,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'black',
    },
  },
  '& .MuiSlider-markLabel': {
    display: 'none',
  },
}));

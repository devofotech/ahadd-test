import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Slider } from '@material-ui/core';

export default function Timeline({
  timeline, onChange, value, ...props
}) {
  return (
    <div className="py-1">
      <Box sx={{ width: 100 }}>
        <OrthoSlider
          color="default"
          defaultValue={props.max ?? 100}
          step={1}
          marks
          min={props.min ?? 1}
          max={props.max ?? 100}
          onChange={(e, v) => onChange(v - 1)}
        />
      </Box>
    </div>
  );
}

const OrthoSlider = styled(Slider)(({ theme }) => ({
  color: '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 10,
    width: 10,
    backgroundColor: '#fff',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 10,
    fontWeight: 'normal',
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#c2c2c2',
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: 'white',
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'white',
    height: 2,
    width: 2,
    borderRadius: 30,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#e0e0e0',
    },
  },
}));

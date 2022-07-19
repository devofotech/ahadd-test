import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Slider, Tooltip } from '@material-ui/core';

export default function Timeline({
  timeline, onChange, value, dateRange, ...props
}) {
  const dateFormat = (date) => {
    const dateBreak = date.split(' ');
    return (
      <>
        <text style={{ fontFamily: 'CeraProRegular' }}>{dateBreak[1]}</text>
        <br />
        <text style={{ fontFamily: 'CeraProRegular' }}>{dateBreak[2]}</text>
      </>
    );
  };

  return (
    <div className="py-1 position-relative">
      <div
        className="position-absolute w-100 text-center"
        style={{ top: -10 }}
      >
        {`(${dateRange.selected})` || 'Null'}
      </div>
      <Box sx={{ width: 100 }}>
        <div
          className="position-absolute text-primary text-center font-weight-bold"
          style={{ top: -15, left: -10 }}
        >
          {dateFormat(dateRange.start) || 'Null'}
        </div>
        <OrthoSlider
          color="default"
          defaultValue={props.max ?? 100}
          ValueLabelComponent={valueLabelComponent}
          valueLabelFormat={dateRange.selected}
          step={1}
          marks
          min={props.min ?? 1}
          max={props.max ?? 100}
          onChange={(e, v) => onChange(v - 1)}
        />
        <div
          className="position-absolute text-primary text-center font-weight-bold"
          style={{ top: -15, right: -10 }}
        >
          {dateFormat(dateRange.end) || 'Null'}
        </div>
      </Box>
    </div>
  );
}

function valueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const OrthoSlider = styled(Slider)(({ theme }) => ({
  color: '#3880ff',
  paddingTop: 30,
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 10,
    width: 10,
    backgroundColor: 'var(--primary-color)',
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
    opacity: 0.7,
    backgroundColor: '#c2c2c2',
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: 'gray',
  },
  '& .MuiSlider-mark': {
    opacity: 0.7,
    backgroundColor: '#c2c2c2',
    height: 10,
    width: 10,
    borderRadius: 30,
    top: 25,
    left: -30,
    '&.MuiSlider-markActive': {
      opacity: 0,
    },
  },
}));

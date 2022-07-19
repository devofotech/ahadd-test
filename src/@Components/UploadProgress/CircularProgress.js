import React from 'react';
import {
  CircularProgress, Box,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

export default (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CustomCircularProgress
        style={{ color: '#CED2DB' }}
        className="position-absolute"
        value={100}
      />
      <CustomCircularProgress
        {...props}
      />
      <Box
        top={2}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {props.value === 100
          ? <DoneIcon className="color-primary" />
          : <p className="text-dark" style={{ fontSize: '.6rem' }}>{Math.round(props.value || 0)}%</p>}
      </Box>
    </Box>
  );
};

const CustomCircularProgress = (props) => {
  return (
    <CircularProgress
      variant="determinate"
      size={35}
      thickness={3}
      {...props}
    />
  );
};

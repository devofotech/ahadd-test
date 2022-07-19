import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

const CustomCircleProgress = (props) => (
  <CircularProgress
    variant="determinate"
    thickness={5}
    {...props}
  />
);

export default ({ scale = 1, x = 0, y = 0, ...props }) => {
  return (
    <Box position="relative" display="inline-flex" style={{ transform: `scale(${scale}) translate(${x}px, ${y}px)`, marginTop: '0.75rem' }}>
      <CustomCircleProgress
        style={{ color: '#CED2DB' }}
        className="position-absolute"
        value={100}
      />
      <CustomCircleProgress value={props.value} style={{ color: 'var(--main-color)' }} {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

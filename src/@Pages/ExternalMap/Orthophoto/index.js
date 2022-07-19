/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

import Timeline from './Timeline';

export default function Property({ value, set_value, ...props }) {
  const [timeline, setTimeline] = useState(false);

  return (
    <Box
      item
      xs={6}
      md={4}
      className="sidebar mb-3"
      style={{
        position: 'fixed', bottom: -40, right: 10, minWidth: '14rem', transform: 'scale(0.95)', visibility: props.open ? 'visible' : 'hidden',
      }}
    >
      <div
        className="p-8"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: 'rgb(13, 25, 59)',
          border: '1px solid gray',
          borderRadius: 3,
        }}
      >
        <Grid
          container
          spacing={1}
          className="d-flex flex-column py-3"
          style={{ paddingInline: '2rem', minWidth: '100%' }}
        >
          <Typography
            variant="h3"
            className="text-center"
            style={{ fontSize: 12, color: 'white' }}
          >
            Time series
          </Typography>
        </Grid>
        <Grid style={{ width: '100%', paddingInline: '2em' }}>
          <Timeline
            {...props}
            timeline={timeline}
            onChange={set_value}
            value={value}
            max={props.max}
          />
        </Grid>
      </div>
    </Box>
  );
}

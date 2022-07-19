/* eslint-disable max-len */
import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

import Timeline from './Timeline';

export default function Property({ value, set_value, ...props }) {
  const [timeline, setTimeline] = useState(false);
  const xValue = (props.isDrawAnnotation || props.isInspection) ? '0%' : '30%';
  const yValue = (props.isDrawAnnotation || props.isInspection) ? '-25px' : '-35px';
  return (
    <Box
      item
      xs={6}
      md={4}
      className="sidebar mx-auto mb-3"
      style={{
        position: 'relative', bottom: -40, maxWidth: '39rem', transform: `translate(${xValue}, ${yValue}) scale(0.95)`, visibility: props.open ? 'visible' : 'hidden',
      }}
    >
      <div
        className="p-8"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          backgroundColor: 'white',
          outline: '1px solid var(--primary-color)',
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
            className="text-center pb-2"
            style={{ fontSize: 13, color: 'var(--primary-color)', fontFamily: 'CeraProRegular', fontWeight: 'bold' }}
          >
            ASSET PROGRESS SLIDER
          </Typography>
        </Grid>
        <Grid className="w-100" style={{ paddingInline: '2em' }}>
          <Timeline
            {...props}
            timeline={timeline}
            onChange={set_value}
            value={value}
            max={props.max}
            dateRange={props.dateRange}
          />
        </Grid>
      </div>
    </Box>
  );
}

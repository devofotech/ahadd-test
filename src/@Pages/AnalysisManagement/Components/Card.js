/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

export default ({ children, isCreate, adjustStyle = {} }) => {
  const [onHover, setOnHover] = useState(false);
  const borderColor = onHover ? 'var(--primary-color)' : '#C8CBD3';
  const outline = isCreate ? '2.5px dashed #C8CBD3' : `1px solid ${borderColor}`;
  return (
    <Grid item xs={3}>
      <div
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        style={{
          position: 'relative',
          height: '20rem',
          backgroundColor: 'white',
          borderRadius: 3,
          outline,
          ...adjustStyle,
        }}
      >
        {children}
      </div>
    </Grid>
  );
};

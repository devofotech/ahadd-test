/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

export default ({ children, isCreate, adjustStyle = {}, isToTheSide = 3, selected, onClick = () => null, className }) => {
  const [onHover, setOnHover] = useState(false);
  const borderColor = onHover ? 'var(--primary-color)' : '#C8CBD3';
  const transform = (onHover && !isCreate) && 'scale(1.01)';
  const outline = isCreate ? '2.5px dashed #C8CBD3' : onHover ? `1px solid ${borderColor}` : 0;
  const border = selected && '2px solid var(--active-color)';
  return (
    <Grid item xs={isToTheSide}>
      <div
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        style={{
          position: 'relative',
          height: '21rem',
          backgroundColor: 'white',
          borderRadius: 3,
          outline,
          border,
          transform,
          transition: 'all .25s',
          boxShadow: !isCreate && '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
          ...adjustStyle,
          marginTop: isToTheSide === 12 ? 20 : 0,
          marginBottom: isToTheSide === 12 ? 10 : 0,
        }}
        className={className}
        onClick={onClick}
      >
        {children}
      </div>
    </Grid>
  );
};

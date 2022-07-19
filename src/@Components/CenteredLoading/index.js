import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import './text.css';

export default function CenteredLoading({ hasText = false, ...props }) {
  const size = props.size || 25;
  const text = props.text || '';
  const fontSize = props.fontSize || '14px';
  return (
    <Grid container justify="center" alignItems="center" className="d-flex flex-column" {...props}>
      <CircularProgress size={size} style={{ margin: 'auto', color: 'var(--primary-color)' }} />
      {hasText && (
        <div
          className="loading-text pt-1 text-primary"
          style={{ fontSize, fontWeight: 600, fontFamily: 'CeraProRegular' }}
        >
          Loading {text}
        </div>
      )}

    </Grid>
  );
}

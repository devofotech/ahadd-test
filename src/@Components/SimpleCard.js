import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function SimpleCard({
  label, value, style, elevation,
}) {
  return (
    <Paper
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        margin: 10,
        ...style,
      }}
      elevation={elevation ?? 1}
    >
      <p style={{ flex: 5 }}>{label}</p>
      <p style={{ flex: 2, textAlign: 'end' }}>{value}</p>
    </Paper>
  );
}

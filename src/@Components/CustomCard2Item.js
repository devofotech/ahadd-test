import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function CustomCard2Item({
  head, child, style, elevation,
}) {
  const Child = ({ items }) => items.map(({ label, value, color }) => (
    <>
      <p style={{ fontSize: '9px' }}>{label}</p>
      <h3 style={{ color }}>{value}</h3>
    </>
  ));
  return (
    <Paper
      style={{
        flex: 1,
        padding: 20,
        margin: 10,
        borderTop: 'solid var(--primary-color) 5px',
        ...style,
      }}
      elevation={elevation ?? 1}
    >
      <h5>{head}</h5>
      <Child items={child} />
    </Paper>
  );
}

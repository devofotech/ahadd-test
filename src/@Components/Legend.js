import React from 'react';

export default function Legend(props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        padding: '2px 6px',
        border: '1px solid rgba(30, 52, 101, 0.45)',
        borderRadius: 5,
        maxHeight: 20,
        ...props.style,
      }}
    >
      <div
        style={{
          width: props.fontSize || 12,
          height: props.fontSize || 12,
          backgroundColor: props.color,
        }}
      />
      <p style={{ fontSize: props.fontSize || 12, marginLeft: 6 }}>
        {props.title}
      </p>
    </div>
  );
}

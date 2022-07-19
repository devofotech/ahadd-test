import React from 'react';

export default (props) => {
  return (
    <div
      className="px-2 d-flex flex-column"
      style={{
        padding: 10, borderRadius: 50, backgroundColor: props.color ?? 'white', color: 'white', textAlign: 'center', width: '10rem',
      }}
    >
      <text className="w-100" style={{ fontSize: 16, fontFamily: 'CeraProRegular' }}>{props.name ?? 'Undefined'}</text>
      <text style={{ fontSize: 8, fontFamily: 'CeraProRegular' }}>{props.status}</text>
    </div>
  );
};

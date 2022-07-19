/* eslint-disable no-mixed-operators */
// refer https://scriptverse.academy/tutorials/reactjs-multicolor-progressbar.html
import React from 'react';
import './style.css';
import { formatBytes } from '@Helpers';
import { Tooltip } from '@material-ui/core';

export default ({ data, totalSize }) => {
  const hasValueData = !!data && !!data.length;
  const calcPercentage = (num) => (num / totalSize * 100).toFixed(1);
  const totalDataSize = data.reduce((a, b) => (a + b.size), 0);

  const values = hasValueData && (
    <>
      <div className="d-flex justify-content-between">
        <p className="color-tertiary">{formatBytes(totalDataSize, true, 2)}</p>
        <p className="color-tertiary">{formatBytes(totalSize, true, 2)}</p>
      </div>
    </>
  );

  const bars = hasValueData && (
    <>
      {data.map((item) => (
        !!item.size && (
          <Tooltip arrow title={`${item.name} (${calcPercentage(item.size)}%)`}>
            <div className="bar" style={{ backgroundColor: item.color, width: `${calcPercentage(item.size)}%` }} key={item.name} />
          </Tooltip>
        )
      ))}
      <Tooltip arrow title={`Unused Space (${calcPercentage(totalSize - totalDataSize)}%)`}>
        <div className="bar" style={{ backgroundColor: '#D9E0E6', width: `${calcPercentage(totalSize - totalDataSize)}%` }} />
      </Tooltip>
    </>
  );

  return (
    <div className="multicolor-bar-2">
      <div className="values">
        {values}
      </div>
      <div className="bars">
        {bars}
      </div>
    </div>
  );
};

/* eslint-disable no-mixed-operators */
// refer https://scriptverse.academy/tutorials/reactjs-multicolor-progressbar.html
import React from 'react';
import './style.css';
import { formatBytes } from '@Helpers';

export default ({ data, totalSize }) => {
  const hasValueData = !!data && !!data.length;
  const calcPercentage = (num) => (num / totalSize * 100).toFixed(1);

  const values = hasValueData && data.map((item) => (
    !!item.size && (
      <div className="value" style={{ width: `${calcPercentage(item.size)}%` }} key={item.name}>
        <span className="title" style={{ color: item.color }}>{calcPercentage(item.size)}%</span><br />
      </div>
    )
  ));

  const bars = hasValueData && data.map((item) => (
    !!item.size && <div className="bar" style={{ backgroundColor: item.color, width: `${calcPercentage(item.size)}%` }} key={item.name} />
  ));

  const legends = hasValueData && data.map((item, idx) => (
    !!item.size && (
      <div className="legend" key={idx}>
        <span className="dot" style={{ color: item.color }}>●</span>
        <span className="label" style={{ color: item.color }}>{item.name}</span>
        <span className="label" style={{ color: item.color }}>&nbsp;({formatBytes(item.size, true, 2)})</span>
      </div>
    )
  ));
  const calibrations = hasValueData && data.map((item, idx) => (
    !!item.size && (
      <div className="graduation" style={{ color: item.color, width: `${calcPercentage(item.size)}%` }} key={idx}>
        <span>|</span>
      </div>
    )
  ));
  return (
    <div className="multicolor-bar">
      <div className="values">
        {values}
      </div>
      <div className="scale">
        {calibrations}
      </div>
      <div className="bars">
        {bars}
      </div>
      <div className="legends">
        {legends}
      </div>
    </div>
  );
};

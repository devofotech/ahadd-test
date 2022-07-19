/* eslint-disable no-mixed-operators */
// refer https://scriptverse.academy/tutorials/reactjs-multicolor-progressbar.html
import React, { useEffect, useState } from 'react';
import './style.css';
import dataBar from './data.json';

export default () => {
  const [colorGradient, setColorGradient] = useState([]);
  const dataReformat = dataBar?.color_height.map(item => ({ color: Object.keys(item)[0], height: Object.values(item)[0] }));
  const stat = [
    { name: 'min', value: dataBar.stat?.min, color: dataReformat[0]?.color },
    { name: 'mean', value: dataBar.stat?.mean, color: dataReformat[(dataReformat.length / 2).toFixed(0)]?.color },
    { name: 'max', value: dataBar.stat?.max, color: dataReformat[dataReformat.length - 1]?.color },
  ];

  useEffect(() => {
    if (!dataBar) return;
    const colorGradientArray = [];
    for (let array = 0; array < dataReformat.length - 1; array++) {
      const colorG = [dataReformat[array].color, dataReformat[array + 1].color];
      colorGradientArray.push(colorG);
    }
    setColorGradient(colorGradientArray);
  }, [dataBar]);

  const values = dataReformat.map((item, idx) => {
    return (
      <div className="value" style={{ left: `${((1 / (dataReformat.length - 1) * 100) * idx) - 2}%` }} key={item.color}>
        <span className="title" style={{ color: 'black' }}>{item.height[0]}m</span><br />
      </div>
    );
  });

  const bars = colorGradient.map((item) => {
    return (
      <div
        className="bar"
        style={{ background: `linear-gradient(to right, ${item[0]}, ${item[1]}`, width: `${1 / (dataReformat.length - 1) * 100}%` }}
        key={item[0]}
      />
    );
  });

  const legends = stat?.map((item, idx) => {
    return (
      !!stat && (
        <div className="legend" key={idx}>
          <span className="dot" style={{ color: item.color }}>●</span>
          <span className="label" style={{ color: item.color }}>{item.name}</span>
          <span className="label" style={{ color: item.color }}>&nbsp;({item.value.toFixed(2)}m)</span>
        </div>
      )
    );
  });

  const calibrations = dataReformat.map((item, idx) => (
    <div className="graduation" style={{ color: 'black', left: `${((1 / (dataReformat.length - 1) * 100) * idx) - 0.5}%` }} key={idx}>
      <span>|</span>
    </div>
  ));

  return (
    <div className="multicolor-indicator">
      <div className="legends">
        {legends}
      </div>
      <div className="bars">
        {bars}
      </div>
      <div className="scale position-relative">
        {calibrations}
      </div>
      <div className="values position-relative">
        {values}
      </div>
    </div>
  );
};

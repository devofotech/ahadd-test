import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

function getTickValues() {
  const temp = [];
  for (let i = 1; i < 32; i++) {
    temp.push(i);
  }
  return temp;
}

const generateData = () => {
  const data = [];
  for (let x = 1; x < 32; x++) {
    data.push({ x, y: Math.floor((Math.random() * 10) + 1) });
  }
  return data;
};

const colorStack = ['#45d97d', '#3baa22', '#e66fb9', '#d7b2f0', '#d6faee', '#4BA850', '#61DB69', '#504BA8', '#A84BA2', '#A8504B', '#DAF2DB'];

export default function MultilineChart({ lines: plines, spanDays }) {
  const tickCount = spanDays > 30 ? spanDays / 30 : spanDays;
  const lines = plines ?? [
    { name: 'Division 1', data: generateData() },
    { name: 'Division 2', data: generateData() },
    { name: 'Division 3', data: generateData() },
  ];
  const tickValues = plines ? plines[0]?.data.map(d => d.Date) : getTickValues();
  return (
    <>

      <VictoryChart
        height={600}
        width={2200}
        padding={{
          left: 60, right: 60, top: 0, bottom: 160,
        }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          style={{
            tickLabels: { fontSize: 32, opacity: 0.65 },
            ticks: { size: 0 },
            axis: { stroke: 'transparent' },
            grid: { stroke: 'transparent' },
          }}
          tickLabelComponent={<VictoryLabel angle={-45} />}
          tickValues={tickValues}
          tickCount={tickCount}
          label="Days"
          axisLabelComponent={(
            <VictoryLabel
              angle={0}
              verticalAnchor="start"
              dy={60}
              dx={0}
              style={{ fontSize: 32 }}
            />
          )}
        />
        <VictoryLegend
          x={1300}
          y={-70}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fontFamily: 'Poppins', fontSize: 40 } }}
          data={lines?.map((line, idx) => ({
            name: line.name,
            symbol: { fill: line.color ?? colorStack[idx], type: 'minus' },
          }))}
        />
        {lines?.map((line, idx) => (
          <VictoryLine
            style={{
              data: { stroke: colorStack[idx] },
              parent: { border: `1px solid ${colorStack[idx]}` },
            }}
            data={line.data}
          />
        ))}
      </VictoryChart>
    </>
  );
}

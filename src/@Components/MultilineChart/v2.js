import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import moment from 'moment';

function getTickValues() {
  const temp = [];
  for (let i = 0; i < 12; i++) {
    temp.push(moment().month(i).format('MMM'));
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

const colorStack = ['#008FFB', '#FEB019', '#EA1601', '#4FD8AF'];

export default function MultilineChart() {
  const lines = [
    { name: 'Minor', data: generateData() },
    { name: 'Major', data: generateData() },
    { name: 'Critical', data: generateData() },
    { name: 'Solved', data: generateData() },
  ];
  const tickValues = getTickValues();
  return (
    <>

      <VictoryChart
        height={600}
        width={2200}
        padding={{
            left: 60, right: 60, top: 160, bottom: 160,
          }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          style={{
            tickLabels: { fontSize: 32, fill: '#045C5C' },
            ticks: { size: 10 },
            axis: { stroke: '#045C5C' },
            // grid: { stroke: 'transparent' },
          }}
          //   tickLabelComponent={<VictoryLabel angle={-45} />}
          tickValues={tickValues}
          tickCount={12}
          axisLabelComponent={(
            <VictoryLabel
              angle={0}
              verticalAnchor="start"
              dy={60}
              dx={0}
            />
          )}
        />
        <VictoryAxis
          label="Total"
          dependentAxis
          style={{
            axis: { stroke: '#045C5C' },
            tickLabels: {
              fontSize: 32,
              padding: 5,
              fill: '#045C5C',
            },
            ticks: { size: 10 },
          }}
          axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-200} dx={10} style={{ fontSize: 32, fill: '#045C5C' }} />}
        />
        <VictoryLegend
          x={500}
          y={500}
          orientation="horizontal"
          gutter={100}
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

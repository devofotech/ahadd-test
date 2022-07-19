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
import _ from 'lodash';
import { formatBytes } from '@Helpers';

const colorStack = ['#F5533D', '#35CC57', '#5397FE', '#FFBA0A'];

export default function MultilineChart({ dataCountData }) {
  const lines = [
    {
      name: '2D',
      data: dataCountData.map((e, idx) => (
        { y: e.orthophotos_size, x: idx + 1, tick: e.tick }
      )),
    },
    {
      name: '3D',
      data: dataCountData.map((e, idx) => (
        { y: e['3d_size'], x: idx + 1, tick: e.tick }
      )),
    },
    {
      name: 'Inspection',
      data: dataCountData.map((e, idx) => (
        { y: e.inspections_size, x: idx + 1, tick: e.tick }
      )),
    },
    {
      name: 'Report',
      data: (dataCountData.map((e, idx) => (
        { y: e.site_reports_size, x: idx + 1, tick: e.tick }
      ))),
    },
  ];
  const tickValues = dataCountData?.map(e => moment(e.tick).format([24].includes(dataCountData.length) ? 'hh a' : 'DD/MM'));
  return (
    <>
      <VictoryChart
        height={500}
        width={2200}
        padding={{
          left: 150, right: 230, top: 100, bottom: 115,
        }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          label={[24].includes(dataCountData.length) ? 'Hours' : 'Days'}
          style={{
            tickLabels: { fontSize: 32, fill: '#045C5C' },
            ticks: { size: 10 },
            axis: { stroke: '#045C5C' },
            // grid: { stroke: 'transparent' },
          }}
          //   tickLabelComponent={<VictoryLabel angle={-45} />}
          tickValues={_.reverse(tickValues)}
          tickCount={10}
          axisLabelComponent={(
            <VictoryLabel
              angle={0}
              verticalAnchor="start"
              dy={60}
              dx={0}
              style={{ fontSize: 32, fill: '#045C5C' }}
            />
          )}
        />
        <VictoryAxis
          label="MB"
          dependentAxis
          tickCount={3}
          tickFormat={(t) => formatBytes(t, false, 2)}
          style={{
            axis: { stroke: '#045C5C' },
            tickLabels: {
              fontSize: 32,
              padding: 5,
              fill: '#045C5C',
            },
            ticks: { size: 10 },
            grid: { stroke: 'grey', opacity: 0.5 },
          }}
          axisLabelComponent={<VictoryLabel angle={270} verticalAnchor="start" dy={-130} dx={10} style={{ fontSize: 32, fill: '#045C5C' }} />}
        />
        <VictoryLegend
          x={2010}
          y={80}
          orientation="vertical"
          gutter={100}
          style={{ labels: { fontFamily: 'CeraProRegular', fontSize: 22 } }}
          data={lines?.map((line, idx) => ({
            name: line.name,
            symbol: { fill: line.color ?? colorStack[idx], type: 'circle' },
            labels: { fill: line.color ?? colorStack[idx] },
          }))}
        />
        {lines?.map((line, idx) => (
          <VictoryLine
            style={{
              data: { stroke: colorStack[idx] },
              parent: { border: `1px solid ${colorStack[idx]}` },
            }}
            data={line.data}
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
          />
        ))}
      </VictoryChart>
    </>
  );
}

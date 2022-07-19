import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryLabel,
  VictoryArea,
} from 'victory';
import moment from 'moment';
import _ from 'lodash';
import { formatBytes } from '@Helpers';

export default function AreaChart({ storageUsageData }) {
  const lines = storageUsageData.map((e, idx) => (
    { y: e.asset_size, x: idx + 1, tick: e.tick }
  ));
  const tickValues = storageUsageData?.map(e => moment(e.tick).format([24].includes(storageUsageData.length) ? 'hh a' : 'DD/MM'));
  return (
    <div className="w-100">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="25%" stopColor="#FEB019" />
            <stop offset="50%" stopColor="#FEC860" />
            <stop offset="75%" stopColor="#FED484" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        height={600}
        width={2200}
        padding={{
          left: 150, right: 60, top: 50, bottom: 140,
        }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          label={[24].includes(storageUsageData.length) ? 'Hours' : 'Days'}
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
          tickCount={4}
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
        <VictoryArea
          style={{
            data: { stroke: '#FEB019', fill: 'url(#gradient)' },
            parent: { border: '1px solid #FEB019' },
          }}
          animate={{ duration: 2000, onLoad: { duration: 1000 } }}
          data={lines}
        />
      </VictoryChart>
    </div>
  );
}

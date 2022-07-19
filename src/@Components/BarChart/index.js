import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
  VictoryGroup,
} from 'victory';

import { MoneyFormat } from '@Helpers';

function BarChart(props) {
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={{ x: [60, 60], y: [0, 0] }}
      width={1200}
      height={500}
      theme={VictoryTheme.material}
    >
      {props.legend && (
        <VictoryLegend
          x={900}
          y={40}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fontFamily: 'Poppins', fontSize: 12 } }}
          data={[
            {
              name: props.legend[0],
              symbol: { fill: '#1F3566', type: 'square' },
            },
            {
              name: props.legend[1],
              symbol: { fill: '#B2DEFF', type: 'square' },
            },
          ]}
        />
      )}
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        tickFormat={(x) => x}
        style={{
          tickLabels: { fontSize: 20, padding: 15 },
          ticks: { size: 0 },
          axis: { stroke: 'rgba(30, 52, 101, 0.15)', strokeWidth: 1 },
          grid: { stroke: 'transparent' },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => MoneyFormat(x)}
        axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-150} dx={0} />}
        style={{
          axis: { stroke: '#FFFFFF' },
          tickLabels: {
            fontSize: 14,
            padding: 5,
            fill: 'rgba(30, 52, 101, 0.65)',
          },
          ticks: { stroke: '#FFFFFF', size: 0 },
          grid: { stroke: 'rgba(30, 52, 101, 0.15)', strokeDasharray: false },
        }}
      />
      <VictoryGroup offset={32} colorScale={['#1F3566', '#B2DEFF']}>
        <VictoryBar
          data={props.data ?? []}
          x="x"
          y="y2"
          barWidth={32}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          cornerRadius={5}
          labels={({ datum }) => Math.floor(datum._y)?.toLocaleString()}
        />
        <VictoryBar
          data={props.data ?? []}
          x="x"
          y="y1"
          barWidth={32}
          animate={{
            duration: 2000,
            onLoad: { duration: 2000 },
          }}
          cornerRadius={5}
          labels={({ datum }) => Math.floor(datum._y)?.toLocaleString()}
        />
      </VictoryGroup>
      {props.topLabel && (
        <VictoryLabel
          // textAnchor='middle'
          style={{ fontSize: 30, fill: '#1F3566', fontWeight: 600 }}
          x={0}
          y={60}
          text={props.topLabel}
        />
      )}
    </VictoryChart>
  );
}

export default BarChart;

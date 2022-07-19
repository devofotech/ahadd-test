import React from 'react';
import {
  VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme,
} from 'victory';

export default function SingleBarGraph({ data, label, height }) {
  return (
    <VictoryChart domainPadding={{ x: 60, y: 20 }} width={1500} height={height ?? 600} theme={VictoryTheme.material}>
      <VictoryAxis
        tickFormat={(x) => x}
        style={{
          tickLabels: { fontSize: 14, padding: 5 },
          ticks: { size: 0 },
          axis: { stroke: 'rgba(30, 52, 101, 0.15)', strokeWidth: 1 },
          grid: { stroke: 'transparent' },
        }}
      />
      <VictoryAxis
        dependentAxis
        label={label}
        axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-270} />}
        tickFormat={(y) => y}
        style={{
          axis: { stroke: '#FFFFFF' },
          tickLabels: { fontSize: 14, padding: 5 },
          ticks: { stroke: '#FFFFFF', size: 0 },
          grid: { stroke: 'rgba(30, 52, 101, 0.15)', strokeDasharray: false },
        }}
      />
      <VictoryBar
        data={data}
        x="x"
        y="y"
        labels={({ datum }) => `${datum.y.toFixed(0)}`}
        barWidth={32}
        animate={{
          duration: 2000,
          onLoad: { duration: 2000 },
        }}
        cornerRadius={3}
        style={{
          data: { fontFamily: 'Poppins', fill: '#1F3566' },
        }}
      />
    </VictoryChart>
  );
}

import React from 'react';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryTheme, VictoryTooltip,
} from 'victory';

function BarChart({ width, height, padding, ...props }) {
  const chartPadding = padding ?? { top: 30, bottom: 60, right: 50, left: 50 };
  width = width ?? 600;
  height = height ?? 350;
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      // domainPadding={60}
      width={width}
      padding={chartPadding}
      height={height}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickFormat={(x) => x}
        style={{
          tickLabels: { fontFamily: 'CeraProRegular', fontSize: 18, padding: 8 },
          ticks: { size: 0 },
          axis: { stroke: 'rgba(30, 52, 101, 0.15)' },
          grid: { stroke: 'transparent' },
        }}
      />
      <VictoryGroup offset={30} colorScale={['#008FFB', '#4FD8AF']}>
        {[
          {
            y: 'y1', duration: 2000, labels: ({ datum }) => datum.y1,
          },
          {
            y: 'y2', duration: 1000, labels: ({ datum }) => datum.y2,
          },
        ].map(e => (
          <VictoryBar
            data={props.data}
            x="x"
            y={e.y}
            barWidth={30}
            labels={e.labels}
            labelComponent={(
              <VictoryTooltip
                flyoutWidth={60}
                flyoutHeight={40}
                cornerRadius={5}
                pointerLength={10}
                flyoutStyle={{
                  stroke: '#1F3566',
                  strokeWidth: 1,
                  fill: 'rgba(255,255,255,0.9)',
                }}
                style={{
                  fontFamily: 'CeraProRegular',
                  fill: '#868C97',
                  fontSize: 15,
                  fontWeight: 500,
                  textAnchor: 'middle',
                }}
              />
            )}
            animate={{
              duration: 2000,
              onLoad: { duration: e.duration },
            }}
            cornerRadius={5}
          />
        ))}
        {/* <VictoryBar
          data={data}
          x="x"
          y="y2"
          barWidth={30}
          labels={({ datum }) => datum.y2}
          labelComponent={(
            <VictoryTooltip
              flyoutWidth={60}
              flyoutHeight={40}
              cornerRadius={5}
              pointerLength={10}
              flyoutStyle={{
                stroke: '#1F3566',
                strokeWidth: 1,
                fill: 'rgba(255,255,255,0.9)',
              }}
              style={{
                fontFamily: 'CeraProRegular',
                fill: '#868C97',
                fontSize: 15,
                fontWeight: 500,
                textAnchor: 'middle',
              }}
            />
          )}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          cornerRadius={5}
        />
        <VictoryBar
          data={data}
          x="x"
          y="y1"
          barWidth={30}
          labels={}
          labelComponent={(
            <VictoryTooltip
              flyoutWidth={60}
              flyoutHeight={40}
              cornerRadius={5}
              pointerLength={10}
              flyoutStyle={{
                stroke: '#1F3566',
                strokeWidth: 1,
                fill: 'rgba(255,255,255,0.9)',
              }}
              style={{
                fontFamily: 'CeraProRegular',
                fill: '#868C97',
                fontSize: 15,
                fontWeight: 500,
                textAnchor: 'middle',
              }}
            />
          )}
          animate={{
            duration: 2000,
            onLoad: { duration: 2000 },
          }}
          cornerRadius={5}
        /> */}
      </VictoryGroup>
    </VictoryChart>
  );
}

export default BarChart;

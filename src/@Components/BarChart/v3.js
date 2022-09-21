import React from 'react';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryTheme, VictoryTooltip,
} from 'victory';
// import data from './data.json';

function BarChart({ data }) {
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      // domainPadding={60}
      height={380}
      width={600}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        dependentAxis
        label="Count"
        axisLabelComponent={<VictoryLabel angle={270} verticalAnchor="start" dy={-43} dx={0} style={{ fontSize: 20 }} />}
      />
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickFormat={(x) => x}
        style={{
          tickLabels: { fontFamily: 'CeraProRegular', fontSize: 20, padding: 8 },
          ticks: { size: 0 },
          axis: { stroke: 'rgba(30, 52, 101, 0.15)' },
          grid: { stroke: 'transparent' },
        }}
        label="Rating"
        axisLabelComponent={<VictoryLabel verticalAnchor="start" dy={20} dx={0} style={{ fontSize: 20 }} />}
      />
      <VictoryLegend
        x={100}
        y={0}
        orientation="horizontal"
        gutter={20}
        style={{ labels: { fontSize: 20 } }}
        padding={{ bottom: 0 }}
        colorScale={['#008FFB', '#4FD8AF']}
        data={[
          { name: 'Engineer Defect Rating', symbol: { fill: '#008FFB', type: 'square' } },
          { name: 'AI Defect Rating', symbol: { fill: '#4FD8AF', type: 'square' } },
        ]}
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
            data={data}
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

import React from 'react';
import {
  VictoryLegend, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel,
} from 'victory';

import dataKomtar from './dataKomtarJBCC.json';

function getRandomArbitrary(min, max) {
  const random = Math.random() * (max - min) + min;
  return parseInt(random);
}

function generateRandomData() {
  const data = [...Array(4)].map((_, i) => ({
    x: i + 1,
    npi: getRandomArbitrary(4000000, 13000000),
    expenses: getRandomArbitrary(7000000, 14000000),
  }));
  return data;
}

const data = {
  0: { name: 'B5', data: generateRandomData() },
  1: { name: 'GALLERIA', data: generateRandomData() },
  2: { name: 'KOMTAR JBCC', data: dataKomtar },
  3: { name: 'MENARA KOMTAR', data: generateRandomData() },
  4: { name: 'LARKIN SENTRAL', data: generateRandomData() },
  5: { name: 'MENARA ANSAR', data: generateRandomData() },
  6: { name: 'MENARA JLAND', data: generateRandomData() },
  7: { name: '@MART', data: generateRandomData() },
  8: { name: '@MART', data: generateRandomData() },
  9: { name: '@MART', data: generateRandomData() },
  10: { name: '@MART', data: generateRandomData() },
};

function SidebarChart({ selectedBuilding }) {
  return (
    <VictoryChart
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={40}
      theme={VictoryTheme.material}
      width={400}
      padding={{
        bottom: 60, right: 60, left: 60, top: 60,
      }}
    >
      <VictoryLegend
        x={125}
        y={330}
        orientation="horizontal"
        gutter={20}
        data={[
          { name: 'NPI', symbol: { fill: '#008FFB', type: 'square' } },
          { name: 'Expenses', symbol: { fill: '#60788B', type: 'square' } },
        ]}
        style={{ labels: { fontFamily: 'Poppins', fontSize: 12 } }}
      />
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={['Audited \n 2020', "As at \n Feb '21", 'Post MCO \n Budget', 'Budget \n 2021']}
        style={{
          tickLabels: { fontSize: 14, padding: 5 },
          ticks: { size: 0 },
          axis: { stroke: 'rgba(30, 52, 101, 0.15)', strokeWidth: 1 },
          grid: { stroke: 'transparent' },
        }}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => `${(x / 1000000).toFixed(1)}`}
        label="(RM mil)"
        axisLabelComponent={<VictoryLabel angle={0} verticalAnchor="start" dy={-140} dx={-10} />}
        style={{
          axis: { stroke: '#FFFFFF' },
          tickLabels: { fontSize: 14, padding: 5 },
          ticks: { stroke: '#FFFFFF', size: 0 },
          grid: { stroke: 'rgba(30, 52, 101, 0.15)', strokeDasharray: false },
        }}
      />
      <VictoryStack colorScale={['#60788B', '#008FFB']}>
        <VictoryBar
          data={data[selectedBuilding]?.data}
          x="x"
          y="expenses"
          barWidth={30}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
        <VictoryBar
          data={data[selectedBuilding].data}
          x="x"
          y="npi"
          barWidth={30}
          cornerRadius={4}
          animate={{
            duration: 2000,
            onLoad: { duration: 2000 },
          }}
        />
      </VictoryStack>
    </VictoryChart>
  );
}

export default SidebarChart;

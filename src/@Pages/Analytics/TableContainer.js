import { useState } from 'react';
import Card from '@Components/CustomCard3';
import StatisticTable from '@Components/MaterialTable/StatisticTable';

const columns = [
  {
    name: 'Network',
    selector: 'network',
    align: 'left',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'Very High (AA)',
    selector: 'aa',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'High (A)',
    selector: 'a',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'Average (B)',
    selector: 'b',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'Poor (C)',
    selector: 'c',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'Very Poor (D)',
    selector: 'd',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'Unrank',
    selector: 'unrank',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
  {
    name: 'TOTAL',
    selector: 'total',
    align: 'right',
    minWidth: 50,
    style: { color: 'var(--dark-blue-color)', fontSize: 14 },
  },
];

const computedRows = [
  {
    network: 'NSE', aa: 2, a: 3, b: 1, c: 4, d: 4, unrank: 34, total: 57,
  },
  {
    network: 'LPT2', aa: 2, a: 3, b: 1, c: 4, d: 4, unrank: 34, total: 57,
  },
];

export default () => {
  return (
    <Card
      className="p-2"
      noAnimation
      isToTheSide={12}
      adjustStyle={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0px', minHeight: '30vh' }}
      hoverColor="#30A6D3"
    >
      <StatisticTable
        tableHead
        columns={columns}
        tableData={computedRows}
      />
    </Card>
  );
};

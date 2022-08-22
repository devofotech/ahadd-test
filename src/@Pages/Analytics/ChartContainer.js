import { useState } from 'react';
import Card from '@Components/CustomCard3';
import BarChart from '@Components/BarChart/v2';

export default () => {
  return (
    <Card
      className="p-2"
      noAnimation
      isToTheSide={12}
      adjustStyle={{ border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0px', height: '35vh' }}
      hoverColor="#30A6D3"
    >
      <BarChart width={1200} height={400} padding={{ top: 30, bottom: 30, right: 30, left: 30 }} />
    </Card>
  );
};

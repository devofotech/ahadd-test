import { useState } from 'react';
import GradientTabs from '@Components/GradientTabs';
import Button from '@Components/Button';
import ChartContainer from './ChartContainer';
import TableContainer from './TableContainer';
import FilterTag from './Components/FilterTag';

export default function Analytics() {
  const tabs = [
    { label: 'BY NETWORK', selector: 0 },
    { label: 'BY SECTION', selector: 1 },
    { label: 'ALL SLOPE CONDITION', selector: 2 },
  ];
  const [tab, setTab] = useState(0);

  return (
    <div className="main-padding">
      <div className="d-flex mb-2 justify-content-between align-items-center">
        <h1 className="text-title">Analytics</h1>
        <Button className="color-gradient-inline px-3" style={{ borderRadius: 50 }}>EXPORT AS PDF</Button>
      </div>
      <GradientTabs tabs={tabs} tab={tab} setTab={setTab} />
      <FilterTag className="mt-2" />
      <ChartContainer />
      <TableContainer />
    </div>
  );
}

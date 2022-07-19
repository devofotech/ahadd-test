import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function CenteredTabs({ value, setValue, items }) {
  const handleChange = (event, newValue) => setValue(newValue);
  return (
    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
      {items.map((item, idx) => (<Tab value={idx} label={item} />))}
    </Tabs>
  );
}

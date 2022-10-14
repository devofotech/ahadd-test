import React from 'react';
import NoData from '@Assets/Images/Data-not-found2.svg';

export default function NoDataInterface() {
  return (
    <div className="flex-standard flex-column" style={{ height: '60vh' }}>
      <img src={NoData} style={{ width: '50%' }} alt="" />
    </div>
  );
}

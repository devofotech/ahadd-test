import React from 'react';
import NoData from '@Assets/Images/DataNotFound.svg';

export default function DeniedPage() {
  return (
    <div className="d-flex justify-content-center">
      <img src={NoData} style={{ height: '70vh' }} />
    </div>
  );
}

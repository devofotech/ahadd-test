import React from 'react';
import CenteredLoading from './CenteredLoading';

export default function CenteredLoadingContainer({ height = null, ...props }) {
  return (
    <div className="flex-standard w-100" style={{ height }}>
      <CenteredLoading {...props} />
    </div>
  );
}

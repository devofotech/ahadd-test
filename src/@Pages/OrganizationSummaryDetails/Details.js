/* eslint-disable no-mixed-operators */
import MultiColorProgressBarV2 from '@Components/MultiColorProgressBarV2';
import { formatBytes, sumBy } from '@Helpers';
import { Button, Chip, Grid } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

export default function Details({
  organization_detail, user_capacity_count, storage_capacity_count, asset_data, onDownloadOrganizationReport,
}) {
  const totalSize = organization_detail?.['StoreStorage.value'] / 1000 * 1024 * 1024 * 1024;
  const calcPercentage = () => (sumBy(asset_data, 'size') / totalSize * 100).toFixed(0);
  return (
    <Grid xs={12} md={9} item className="d-flex flex-column px-4" style={{ height: '82vh', overflow: 'hidden auto' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h3>User Capacity</h3>
        <Button variant="contained" style={{ backgroundColor: 'var(--primary-color)' }} onClick={onDownloadOrganizationReport}>
          <p className="text-white">Download Excel</p>
        </Button>
      </div>
      <Grid container spacing={2} className="py-3">
        {user_capacity_count.map((item) => (
          <Grid item xs={12} sm={6} key={item?.name}>
            <div className="p-3 d-flex justify-content-between align-items-center shadow-sm border border-dark rounded">
              <p className="color-tertiary">{item.name} Count</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="color-tertiary pr-3">
                  <span className="color-primary" style={{ fontSize: 24 }}>{item.value}</span>{!!item.max && `/${item.max}`}
                </p>
                <ChevronRight className="pointer" />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <h3>Storage Capacity</h3>
      <div className="d-flex">
        <div className="d-flex align-items-end" style={{ width: '20%' }}>
          <h1>{calcPercentage()}%</h1><p className="color-tertiary">&nbsp;used</p>
        </div>
        <div style={{ width: '80%', paddingLeft: 2 }}>
          <MultiColorProgressBarV2 data={asset_data} totalSize={totalSize} />
        </div>
      </div>
      <Grid container spacing={2} className="py-4">
        {asset_data.map((item) => (
          <Grid item xs={12} sm={6} key={item?.name}>
            <div className="px-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Chip
                  size="small"
                  style={{ backgroundColor: item.color, width: '1.5rem', height: '0.5rem' }}
                />
                <p className="text-dark pl-2">{item.name}</p>
              </div>
              <p>{formatBytes(item.size, true, 2)}</p>
            </div>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} className="py-3">
        {storage_capacity_count.map((item) => (
          <Grid item xs={12} sm={6} key={item?.name}>
            <div className="p-3 d-flex justify-content-between align-items-center shadow-sm border border-dark rounded">
              <p className="color-tertiary">{item.name} Count</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="color-tertiary pr-3">
                  <span className="color-primary" style={{ fontSize: 24 }}>{item.value}</span>{!!item.max && `/${item.max}`}
                </p>
                <ChevronRight className="pointer" />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

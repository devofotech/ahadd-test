import { Grid } from '@material-ui/core';

export default function Sidebar({ organization_detail }) {
  return (
    <Grid item xs={12} md={3} className="sidebar bottom-bar" style={{ zIndex: 1 }}>
      <img
        className="sidebar-img"
        style={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
        src={`${process.env.REACT_APP_S3}/static/media/defaultAssetImg-01.png`}
        alt="asset"
      />
      <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>
        <p className="color-tertiary pt-3">{organization_detail?.description ?? ''}</p>
      </div>
    </Grid>
  );
}

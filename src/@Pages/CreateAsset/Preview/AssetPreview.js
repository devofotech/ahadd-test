import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import AssetDetail from '@Components/AssetDetail';

export default (h) => {
  const assetDetailData = {
    asset_type: h.selectedTypeProfile.name, location: h.location, state: h.state,
  };
  return (
    <div style={{ height: '60vh' }}>
      <h3 className="text-dark my-4">Asset Preview</h3>
      <Grid container item xs={12} className="sidebar h-100" style={{ zIndex: 1 }}>
        <img
          className="sidebar-img"
          style={{ objectFit: 'contain', width: '100%', aspectRatio: '3/2' }}
          src={!!h.files[0]?.preview ? h.files[0].preview : `${process.env.REACT_APP_S3}/static/media/defaultAssetImg-01.png`}
          alt="asset"
        />
        <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>
          <Box style={{ width: '90%', marginTop: '10px' }}>
            <Button
              className="flex-standard"
              style={{
                width: '100%', height: '55px', borderRadius: 10, backgroundColor: 'var(--secondary-color)', color: '#ffffff', lineHeight: 'normal',
              }}
            >
              <h6 style={{ color: '#ffffff' }}>{h?.name}</h6>
            </Button>
          </Box>
          <AssetDetail assetTypeList={h.assetTypeList} details={assetDetailData} />
        </div>
      </Grid>
    </div>
  );
};

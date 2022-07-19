import React from 'react';
import {
  Box, Button, Grid,
} from '@material-ui/core';
import AssetDetail from '@Components/AssetDetail';
import ProjectSummary from '@Components/AssetDetail/ProjectSummary';
import DemoLabel from '@Assets/Images/demo-label.svg';
import EditBuilding from './EditBuilding';

export default (h) => {
  return (
    <Grid item xs={12} md={3} className="sidebar bottom-bar position-relative" style={{ zIndex: 1 }}>
      {!!h.asset?.is_demo && (
        <img
          src={DemoLabel}
          style={{
            position: 'absolute',
            zIndex: 99,
            top: -7,
            left: 5,
          }}
        />
      )}
      <img
        className="sidebar-img"
        style={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
        src={`${process.env.REACT_APP_S3}/${!!h.asset?.image ? h.asset.image : 'static/media/defaultAssetImg-01.png'}`}
        alt="asset"
      />
      <div className="d-flex justify-content-center flex-wrap" style={{ flex: 1 }}>
        <h6 className="text-light text-center w-100 mt-3 mb-0">ASSET INFO</h6>
        <Box style={{ width: '90%', marginTop: '10px' }}>
          <Button
            className="flex-standard"
            style={{
              width: '100%', height: '55px', borderRadius: 10, backgroundColor: 'var(--secondary-color)', color: '#ffffff', lineHeight: 'normal',
            }}
          >
            <h6 style={{ color: '#ffffff' }}>{h.asset?.name}</h6>
          </Button>
        </Box>
        <AssetDetail hasSummary assetTypeList={h.assetTypeList} details={h.asset ?? {}} />
        <Box className="d-flex flex-column" style={{ width: '90%' }}>
          <ProjectSummary details={h.asset} phases={h.projectPhaseList} isLoading={h.isLoadingPhases} modules={h.modules} />
        </Box>
        {h.asset?.description && (
          <div
            style={{
              padding: 20, margin: 20, backgroundColor: '#F5FAFF', maxWidth: '100%', overflowWrap: 'anywhere', textAlign: 'justify',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: h.asset?.description }} />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <EditBuilding {...h} />
      </div>
    </Grid>
  );
};

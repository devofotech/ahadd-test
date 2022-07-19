import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import GenAssetImg from '@Assets/Images/gen-asset.png';
import BuildAssetImg from '@Assets/Images/build-asset.png';
import AgriAssetImg from '@Assets/Images/agri-asset.png';
import InfraAssetImg from '@Assets/Images/infra-asset.png';

export default function AssetSummary(h) {
  return (
    <Grid item md={12} style={{ marginTop: 20 }}>
      <Paper style={{ padding: 35 }}>
        <h3>Assets Summary</h3>
        <Grid container className="mt-3 mb-5 d-flex justify-content-between overflow-auto" style={{ gap: h.isOrgUnlimited ? 50 : 20 }}>
          {[
            { asset_name: 'General', img: GenAssetImg },
            { asset_name: 'Building', img: BuildAssetImg },
            { asset_name: 'Agriculture', img: AgriAssetImg },
            { asset_name: 'Infrastructure', img: InfraAssetImg },
          ].map((asset, idx) => (
            <Grid
              item
              xs={12}
              lg={h.isOrgUnlimited ? 4 : 2}
              xl={h.isOrgUnlimited ? 4 : 2}
              md={4}
              className="bg-color-container"
              style={{ minWidth: h.isOrgUnlimited ? '21.9vw' : '10vw' }}
            >
              <div className="d-flex flex-column">
                <img src={asset.img} />
                <div className="p-3">
                  {h.isOrgUnlimited
                    ? <p className="text-light" style={{ fontSize: 16 }}>{asset.asset_name} Asset <br />&nbsp;</p>
                    : <p className="text-light" style={{ fontSize: 14 }}>{asset.asset_name}<br />Asset</p>}
                  <h5 className="mt-4 mb-4" style={{ fontSize: 30, color: 'var(--secondary-color)' }}>{h.assetById[idx + 1]?.length ?? 0}</h5>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}

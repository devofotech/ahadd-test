import { InsightIcon } from '@Assets/Icons/InsightIcon';
import CircularProgressBar from '@Components/CircularProgressBar';
import { formatBytes } from '@Helpers';
import {
  Button, Divider, Grid, CircularProgress,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default (h) => {
  const usagePercentage = (h.totalAssetUsage / h.totalSize) * 100;
  return (
    <Grid container direction="row" item xs={3} alignItems="stretch">
      <Grid item xs={12} className="mb-2">
        <div className="paper-shadow bg-white rounded h-100">
          <h3 className="mb-2" style={{ paddingLeft: 35, paddingTop: 35 }}>Storage Usage</h3>
          {h.isLoadingSidebar ? (
            <div className="flex-standard w-100 h-100">
              <CircularProgress size={100} style={{ color: 'var(--primary-color)' }} />
            </div>
          ) : (
            <>
              <br />
              <div className="d-flex justify-content-center my-5">
                <CircularProgressBar scale={3.5} value={usagePercentage} style={{ color: '#FEB019' }} />
              </div>
              <br />
              <div className="d-flex flex-column align-items-center">
                <p className="font-weight-bold" style={{ color: '#FEB019', fontSize: '3.5rem' }}>{formatBytes(h.totalAssetUsage, true, 1)}</p>
                <p className="font-weight-bold color-tertiary">Used out of {formatBytes((h.totalSize), true, 1)}</p>
                <div className="d-flex justify-content-around my-3 mb-5 w-100">
                  <Link to="/storage-analysis">
                    <ButtonSidebar><p className="text-white">View Usage</p></ButtonSidebar>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </Grid>
      {[0].includes(h.storageMonitoringTab) && (
        <Grid item xs={12} className="my-2">
          <div className="paper-shadow bg-white rounded h-100 position-relative overflow-auto hide-scroll">
            <h3 style={{ paddingLeft: 35, paddingTop: 35 }}>Current Data Count</h3>
            {h.isLoading ? (
              <div className="flex-standard w-100 h-100">
                <CircularProgress size={100} style={{ color: 'var(--primary-color)' }} />
              </div>
            ) : (
              <>
                <br />
                <Grid container xs={12} className="d-flex justify-content-around position-absolute" style={{ top: '35%', transform: 'scale(0.85)', left: 0 }}>
                  <Grid item className="d-flex align-items-center">
                    <InsightIcon color="var(--secondary-color)" width={30} height={30} />
                    <h1 className="color-secondary ml-1" style={{ fontSize: '2.4vh', fontWeight: 'bold' }}>
                      {formatBytes(h.dataCount?.asset_size, true, 2)}
                    </h1>
                  </Grid>
                  <Grid item><Divider orientation="vertical" /></Grid>
                  <Grid container item direction="column" xs={5}>
                    <Grid item className="d-flex my-1">
                      <InsightIcon color="#F5533D" width={25} height={25} />
                      <h3 style={{ color: '#F5533D', fontSize: '2vh' }} className="ml-1">{formatBytes(h.dataCount?.orthophotos_size, true, 2)}</h3>
                    </Grid>
                    <Grid item className="d-flex my-1">
                      <InsightIcon color="#35CC57" width={25} height={25} />
                      <h3 style={{ color: '#35CC57', fontSize: '2vh' }} className="ml-1">{formatBytes(h.dataCount?.['3d_size'], true, 2)}</h3>
                    </Grid>
                    <Grid item className="d-flex my-1">
                      <InsightIcon color="#5397FE" width={25} height={25} />
                      <h3 style={{ color: '#5397FE', fontSize: '2vh' }} className="ml-1">{formatBytes(h.dataCount?.inspections_size, true, 2)}</h3>
                    </Grid>
                    <Grid item className="d-flex my-1">
                      <InsightIcon color="#FFBA0A" width={25} height={25} />
                      <h3 style={{ color: '#FFBA0A', fontSize: '2vh' }} className="ml-1">{formatBytes(h.dataCount?.site_reports_size, true, 2)}</h3>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </Grid>
      )}
    </Grid>
  );
};

const ButtonSidebar = (props) => (
  <Button size="small" variant="contained" style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)' }} {...props}>
    <AddOutlined /> {props.children}
  </Button>
);

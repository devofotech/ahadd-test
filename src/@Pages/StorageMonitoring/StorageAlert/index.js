import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import AlertCard from '../AlertCard';
import AlertDialog from '../AlertDialog';

export default (h) => {
  return (
    <>
      <div className="paper-shadow bg-white rounded px-2 px-4 mb-2" style={{ height: '98%' }}>
        <div className="d-flex justify-content-between align-items-center" style={{ padding: 20 }}>
          <h3>Alerts</h3>
          <div className="d-flex justify-content-between align-items-center">
            {!h.isLoadingAlert && (
              <>
                <IconButton>
                  <Refresh onClick={() => h.refreshStorageAlert(h.organizationId)} />
                </IconButton>
                <AlertDialog create {...h} />
              </>
            )}
          </div>
        </div>
        {h.isLoadingAlert
          ? <LoadingAlert />
          : (
            <Grid container xs={12} className="my-2 overflow-auto" style={{ maxHeight: '45vh' }}>
              {h?.storageAlertList.map(e => <AlertCard {...h} {...e} />)}
            </Grid>
          )}
      </div>
    </>
  );
};

const LoadingAlert = () => (
  <div className="flex-standard my-5">
    <CircularProgress size={100} style={{ color: 'var(--primary-color)' }} />
  </div>
);

import Button from '@Components/Button';
import { CircularProgress, Grid } from '@material-ui/core';
import AssetPreview from './AssetPreview';
import AssetSummary from './AssetSummary';

export default (h) => {
  return (
    <div className="position-relative">
      {h.isLoading ? <LoadingProgress /> : (
        <div className="content mx-auto" style={{ width: '90%' }}>
          <Grid container spacing={2} className="">
            <Grid item xs={3}>
              <AssetPreview {...h} />
            </Grid>
            <Grid item xs={9}>
              <AssetSummary {...h} />
            </Grid>
          </Grid>
          <div className="mt-3 d-flex justify-content-end" style={{ gap: 10 }}>
            <Button variant="text" onClick={h.handleBackStep}>
              PREVIOUS
            </Button>
            <Button onClick={h.createAsset}>
              NEXT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingProgress = () => (
  <>
    <div style={{ backgroundColor: 'gray', opacity: 0.3, height: '60vh' }} />
    <CircularProgress
      size={75}
      style={{
        color: 'green', position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
      }}
    />
  </>
);

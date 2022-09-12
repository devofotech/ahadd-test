import Button from '@Components/Button';
import { CircularProgress, Grid } from '@material-ui/core';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import AssetPreview from './AssetPreview';
import AssetSummary from './AssetSummary';

export default (h) => {
  return (
    <div className="position-relative">
      {h.isLoading ? <CenteredLoadingContainer height="50vh" size={75} hasText /> : (
        <>
          <div
            className="mx-auto"
            style={{ width: '40%', height: '60vh', borderRadius: 10 }}>
            <Grid container xs={12}>
              <Grid item xs={7}>
                <AssetPreview {...h} />
              </Grid>
              <Grid item xs={5}>
                <AssetSummary {...h} />
              </Grid>
            </Grid>
          </div>
          <div className="mt-3 d-flex justify-content-end" style={{ gap: 10 }}>
            <Button variant="text" onClick={h.handleBackStep} size="small">
              PREVIOUS
            </Button>
            <Button className="color-gradient-block" onClick={h.createAsset} size="small">
              CREATE ASSET
            </Button>
          </div>
        </>
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

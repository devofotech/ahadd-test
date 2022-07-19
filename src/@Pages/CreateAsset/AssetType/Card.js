import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import { Grid } from '@material-ui/core';
import AssetCard from '../Component/AssetCard';

export default (h) => {
  return (
    <div className="mx-auto" style={{ width: '90%', height: '680px' }}>
      <Grid container spacing={2} className="h-100">
        {h.isLoadingAssets ? <CenteredLoadingContainer height="50vh" size={75} hasText text="data" /> : (
          <>
            {h.assetTypeList.map(asset => (
              <Grid item xs={12} md={3}>
                <AssetCard {...h} data={asset} isAssetsType isDisabled={[3].includes(asset.id)} />
              </Grid>
            ))}
            <Grid container justify="center" alignItems="center" className="my-2">
              <p className="my-auto">
                Asset type not listed ?&nbsp;
                <a href="https://georaise.com/contact-us" target="_blank" rel="noopener noreferrer" className="color-text-primary">
                  Contact Us
                </a>
              </p>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

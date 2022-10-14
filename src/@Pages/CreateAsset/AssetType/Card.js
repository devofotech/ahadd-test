import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import { Grid } from '@material-ui/core';
import AssetCardList from '../Component/AssetCardList';

export default (h) => {
  return (
    <div className="mx-auto" style={{ width: '85%', height: '580px' }}>
      <Grid container spacing={2} className="h-100">
        {h.isLoadingAssets ? <CenteredLoadingContainer height="50vh" size={75} hasText text="data" /> : (
          <>
            {h.assetTypeList.map(asset => (
              <Grid item xs={12} md={6}>
                <AssetCardList {...h} data={asset} isAssetsType isDisabled={[null].includes(asset.id)} />
              </Grid>
            ))}
            <Grid container justify="center" alignItems="center" className="my-2">
              <p className="my-auto">
                Asset type not listed ?&nbsp;
                <a href="https://cip.plus.com.my/#/customer-feedback-form/PW" target="_blank" rel="noopener noreferrer" className="color-text-primary">
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

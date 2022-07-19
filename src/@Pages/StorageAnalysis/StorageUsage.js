import MultiColorProgressBar from '@Components/MultiColorProgressBar';
import SearchBox from '@Components/SearchBox';
import { Grid } from '@material-ui/core';
import AssetCard from './AssetCard';

export default (h) => {
  const assetType = Object.assign({}, ...h.assetTypeList?.map(m => ({ [m.id]: m.name })));
  return (
    <Grid container xs={12} className="mt-2 py-4 bg-color-container">
      <Grid item xs={12} className="d-flex justify-content-between">
        <h3>Storage Usage</h3>
        <SearchBox onChange={(e) => h.setSearchKey(e.target.value)} style={{ transform: 'translate(25, 0) scale(0.8)' }} />
      </Grid>
      <Grid item xs={12}><MultiColorProgressBar {...h} /></Grid>
      <Grid container item xs={12} spacing={1} className="mt-3 overflow-auto" style={{ maxHeight: '40vh' }}>
        {h.asset?.map(data => (
          <Grid item xs={12} lg={6} xl={4}>
            <AssetCard data={data} assetType={assetType[data.AssetTypeId]} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

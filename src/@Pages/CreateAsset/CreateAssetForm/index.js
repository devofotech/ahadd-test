import Button from '@Components/Button';
import { Grid } from '@material-ui/core';
import AssetCard from '../Component/AssetCard';
import FormInput from './FormInput';

export default (h) => {
  const isDisabled = !(!!h.name && !!h.marker && !!h.location && !!h.state);
  return (
    <div className="mx-auto" style={{ width: '90%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AssetCard {...h} data={h.selectedTypeProfile} view />
        </Grid>
        <Grid item xs={9}>
          <FormInput {...h} />
        </Grid>
      </Grid>
      <div className="d-flex justify-content-end mt-5" style={{ gap: 10 }}>
        <Button variant="text" onClick={h.handleBackStep}>
          PREVIOUS
        </Button>
        <Button disabled={isDisabled} onClick={h.handleNextStep}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

import Button from '@Components/Button';
import { Grid } from '@material-ui/core';
import AssetCard from '../Component/AssetCard';
import { LifeCycleSelect, PhaseCheckBox } from '../Component/AssetTypeComponent';

export default (h) => {
  const isDisabled = !Object.values(h.selectedPhase).filter(Boolean).length; // true if not select project phase
  return (
    <div className="mx-auto" style={{ width: '90%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AssetCard {...h} data={h.selectedTypeProfile} view />
        </Grid>
        <Grid item xs={9}>
          <LifeCycleSelect {...h} />
          <PhaseCheckBox {...h} />
        </Grid>
      </Grid>
      <div className="d-flex justify-content-end mt-5" style={{ gap: 10 }}>
        <Button variant="text" onClick={h.handleBackStepAssetType}>
          PREVIOUS
        </Button>
        <Button onClick={h.handleNextStepAssetType} disabled={isDisabled}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

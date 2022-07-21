import Button from '@Components/Button';
import { getTrueInObject } from '@Helpers';
import { Grid } from '@material-ui/core';
import AssetCard from '../Component/AssetCard';
import { ModuleCheckBox } from '../Component/AssetTypeComponent';

export default (h) => {
  const selectedPhase = getTrueInObject(h.selectedPhase);
  const notGeneralModule = h.modules.filter(x => !x.is_general);
  let solidPhase = 0;
  for (let pidx = 0; pidx < selectedPhase.length; pidx++) {
    const modInThisPhase = notGeneralModule.filter(ngm => ngm.phase_ids.split(',').includes(selectedPhase[pidx]));
    if (modInThisPhase.length) solidPhase++;
  }
  const selectedModule = Object.keys(h.selectedModule).map(m => ({ phaseId: m, module: getTrueInObject(h.selectedModule[m]) }));
  const isDisabled = !(solidPhase === selectedModule.filter(f => !!f.module.length).length); // true if not select module

  return (
    <div className="mx-auto" style={{ width: '90%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AssetCard {...h} data={h.selectedTypeProfile} view />
        </Grid>
        <Grid item xs={9} className="hide-scroll" style={{ maxHeight: '40.3rem', overflowY: 'scroll', overflowX: 'hidden' }}>
          {Object.keys(h.selectedPhase).filter(x => !!h.selectedPhase[x]).map(x => <ModuleCheckBox {...h} PhaseId={x} />)}
        </Grid>
      </Grid>
      <div className="d-flex justify-content-end mt-5" style={{ gap: 10 }}>
        <Button variant="text" onClick={h.handleBackStepAssetType}>
          PREVIOUS
        </Button>
        <Button
          onClick={() => {
            if (!solidPhase) h.handleNextStep();
            else h.handleNextStepAssetType();
          }}
          disabled={isDisabled}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

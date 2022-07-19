import Button from '@Components/Button';
import { getTrueInObject } from '@Helpers';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import AssetCard from '../Component/AssetCard';
import { ParameterCheckBox, SelectAllCheckbox } from '../Component/AssetTypeComponent';

export default (h) => {
  const checkModule = !!h.selectedModule[4] && !!h.selectedModule[5];
  const generalmoduleid = h.modules.find(mod => mod.is_general).id;
  const objParameter = _.groupBy(h.assetParameters, 'ModuleId');
  const totalModule = _.sum(Object.keys(h.selectedModule).map(pid => getTrueInObject({
    ...h.selectedModule[pid],
    [generalmoduleid]: false,
  }).length));
  const parameterListByModule = [];
  Object.keys(h.selectedAssetParameter)
    .map(m => parameterListByModule.push(Object.keys(h.selectedAssetParameter[m])
      .map(e => h.selectedAssetParameter[m]?.[e])));
  const parameterSelectedByModule = parameterListByModule.map(m => m.map(e => getTrueInObject(e)).filter(f => !!f.length).length);
  const isDisabled = !(totalModule === _.sum(parameterSelectedByModule));
  return (
    <div className="mx-auto" style={{ width: '90%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <AssetCard {...h} data={h.selectedTypeProfile} view />
        </Grid>
        <Grid item xs={9} className="overflow-auto" style={{ maxHeight: '40.3rem' }}>
          {Object.keys(h.selectedPhase).filter(x => !!h.selectedPhase[x]).map(phaseid => {
            if (!h.selectedModule[phaseid]) return <></>;
            const selectedModuleInPhase = Object.keys(h.selectedModule[phaseid]).filter(x => !!h.selectedModule[phaseid][x]);
            return selectedModuleInPhase.map(moduleid => {
              const m = h.modules.find(x => x.id == moduleid);
              const ph = h.assetPhaseList.find(x => x.id == phaseid);
              const selectedParameterByModule = h.selectedAssetParameter[ph.id]?.[m.id];
              return (
                <>
                  <Header
                    PhaseId={ph.id}
                    ModuleId={m.id}
                    title={m.name}
                    phase={ph.name}
                    list={objParameter[m.id]}
                    onSet={h.setSelectedAssetParameter}
                    allSelected={objParameter[m.id]?.length === (selectedParameterByModule
                      ? getTrueInObject(selectedParameterByModule)?.length
                      : 0)}
                    {...h}
                  />
                  {
                    !!objParameter[m.id]?.length
                      ? (
                        <ParameterCheckBox
                          PhaseId={ph.id}
                          ModuleId={m.id}
                          list={objParameter[m.id]}
                          isBoth={checkModule}
                          onChange={(e) => h.handleUpdateParameter(e, moduleid, phaseid)}
                          hasCustomParameter={m.settings.split(',').includes('custom_parameter')}
                          {...h}
                        />
                      )
                      : <p className="mb-4">No parameter is assigned in {m.name} module</p>
                  }
                </>
              );
            });
          })}
        </Grid>
      </Grid>
      <div className="d-flex justify-content-end mt-5" style={{ gap: 10 }}>
        <Button variant="text" onClick={h.handleBackStepAssetType}>
          PREVIOUS
        </Button>
        <Button onClick={h.handleNextStep} disabled={isDisabled}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

const Header = (h) => (
  <div className="d-flex justify-content-between align-items-center mb-2">
    <h3 className="text-dark mt-2">
      Customize your&nbsp;<span className="text-uppercase color-secondary">{h.title}</span>
      &nbsp;annotation module parameter in&nbsp;<span className="text-uppercase color-secondary">{h.phase}</span>
    </h3>
    {!!h.list?.length && <SelectAllCheckbox {...h} />}
  </div>
);

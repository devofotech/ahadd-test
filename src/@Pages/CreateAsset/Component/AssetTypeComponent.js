import { useState } from 'react';
import {
  Checkbox, FormControl, FormControlLabel, FormGroup, Grid,
} from '@material-ui/core';
import { Button, ButtonGroup } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import CustomParameter from './CustomParameter';

const GreenCheckbox = withStyles({
  root: {
    color: '#04847C',
    '&$checked': {
      color: '#04847C',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CustomCheckbox = (h) => (
  <FormControlLabel
    control={<GreenCheckbox checked={h.option.value || false} name={h.option.id} {...h} />}
    label={h.hasLabel ? h.option.label : h.option.name}
    className="mx-1 rounded w-100"
    style={{ border: '1px solid var(--secondary-color)', backgroundColor: h.option.value ? '#EDF5F4' : '#fff' }}
  />
);

export const SelectAllCheckbox = (h) => {
  const handleSelectAll = () => {
    const newObjs = {};
    h.list.forEach(p => {
      newObjs[p.id] = !h.allSelected;
    });
    h.setSelectedAssetParameter(pv => ({
      ...pv,
      [h.PhaseId]: {
        ...pv[h.PhaseId],
        [h.ModuleId]: newObjs,
      },
    }));
  };
  return (
    <FormControlLabel
      control={<GreenCheckbox checked={h.allSelected} name="select all" onChange={handleSelectAll} {...h} />}
      label={h.allSelected ? 'Deselect All' : 'Select All'}
      className="mx-2 my-auto rounded pr-2"
      style={{ border: '1px solid var(--secondary-color)', backgroundColor: h.allSelected ? '#EDF5F4' : '#fff' }}
    />
  );
};

export const ModuleCheckBox = (h) => {
  const moduleList = (data) => (!!data.length
    ? data.map(option => (
      <Grid item xs={12}>
        <CustomCheckbox
          option={{ ...option, value: h.selectedModule[h.PhaseId]?.[option.id] }}
          onChange={(e) => h.handleUpdateModule(e, h.PhaseId)}
          hasLabel
        />
      </Grid>
    ))
    : <p className="mb-4">No custom module is available in this phase. Inspection created will default to <strong>General</strong> module.</p>
  );
  return (
    <>
      <h3 className="text-dark mt-3">{h.assetPhaseList.find(x => x.id == h.PhaseId).name}: Select Annotation Module (you may select multiple)</h3>
      <Grid item xs={12} className="mt-3">
        <FormControl component="fieldset" className="w-100">
          <FormGroup>
            <Grid container xs={12}>
              {moduleList(h.modules.filter(x => x.phase_ids.split(',').includes(h.PhaseId) && !x.is_general))}
            </Grid>
          </FormGroup>
        </FormControl>
      </Grid>
    </>
  );
};

export const ParameterCheckBox = (h) => {
  return (
    <Grid item xs={12} className="mb-4 pb-1 mt-2 hide-scroll" style={{ maxHeight: '35rem', overflowX: 'hidden', overflowY: 'scroll' }}>
      <FormControl component="fieldset" className="w-100">
        <FormGroup>
          <Grid container xs={12} spacing={1}>
            {h.list?.map(option => (
              <Grid item xs={6}>
                <CustomCheckbox
                  option={{ ...option, value: h.selectedAssetParameter[h.PhaseId]?.[h.ModuleId]?.[option.id] }}
                  onChange={h.onChange}
                  hasLabel
                />
              </Grid>
            ))}
            {h.hasCustomParameter && <Grid item xs={6}><CustomParameter paramList={h.list} {...h} /></Grid>}
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export const LifeCycleSelect = ({ lifeCycle, setLifeCycle, setSelectedPhase }) => {
  const [onHover, setOnHover] = useState(false);
  const [onMove, setOnMove] = useState('');
  return (
    <>
      <h3 className="text-dark">Do you need Asset Lifecycle ?</h3>
      <Grid item xs={12} className="mt-3 w-100" style={{ marginLeft: '4px' }}>
        <ButtonGroup value={lifeCycle} className="w-100">
          {['yes', 'no'].map(
            (status) => (
              <Button
                onMouseMove={() => { setOnHover(true); setOnMove(status); }}
                onMouseLeave={() => { setOnHover(false); setOnMove(status); }}
                value={status}
                // color="success"
                outline={status !== lifeCycle}
                onClick={() => {
                  setLifeCycle(status);
                  setSelectedPhase({});
                }}
                className="text-capitalize"
                style={{
                  border: '1px solid var(--primary-color)',
                  backgroundColor:
                    (lifeCycle === status && 'var(--primary-color)') || ((onHover && onMove !== lifeCycle) && 'var(--secondary-color)'),
                }}
              >
                {status}
              </Button>
            ),
          )}
        </ButtonGroup>
      </Grid>
    </>
  );
};

export const PhaseCheckBox = (h) => (
  <>
    <h3 className="text-dark mt-4">Select Phase (you may select multiple)</h3>
    <Grid item xs={12} className="mt-3 pb-2">
      <FormControl component="fieldset" className="w-100">
        <FormGroup>
          <Grid container xs={12}>
            {h.assetPhaseList.map((option, idx) => (
              <Grid item xs={12}>
                <CustomCheckbox
                  option={option}
                  onChange={h.handleUpdatePhase}
                  disabled={h.lifeCycle === 'yes' ? [1, 4].includes(idx) : [0, 1, 2, 4].includes(idx)}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  </>
);

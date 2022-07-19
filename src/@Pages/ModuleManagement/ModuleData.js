import React from 'react';
import {
  Chip, Grid, CircularProgress, makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { capitalize, moduleSettings, pluralizer } from '@Helpers';

export default ({ data, ...props }) => {
  const classes = useStyles();
  const asset_type = !!data?.assettype_ids ? data?.assettype_ids.split(',') : [];
  const asset_phase = !!data?.phase_ids ? data?.phase_ids.split(',') : [];
  const assetNaming = label => String(label).replace('Asset', '');
  return (
    <Link to={`/module-management/${data?.id}`}>
      <div className="px-2 pt-1 position-relative" style={{ height: '100%', cursor: 'pointer', fontSize: '0.8rem' }}>
        <div className="flex-standard mx-auto mt-3">
          <h3 className="color-primary">{data.name}</h3>
        </div>
        <div className="d-flex flex-column mx-auto mt-2 px-3">
          <p className="text-light mb-1">{pluralizer('Parameter', props.selectedParameter?.filter(f => !!f.is_active).length)}</p>
          <div className="my-2 relative hide-scroll" style={{ height: '9rem', overflowY: 'scroll' }}>
            {!!props.selectedParameter?.filter(f => !!f.is_active).length
              ? props.selectedParameter.filter(f => !!f.is_active).map((e, idx) => (
                <p style={{ color: 'var(--dark-color)' }}>{idx + 1}. {e.label}</p>
              ))
              : <p style={{ color: 'var(--dark-color)' }}>No Assigned Parameter</p>}
          </div>
          <div className="my-2">
            <p className="text-light mb-1">{pluralizer('Phase', asset_phase.length)}</p>
            <div className="d-flex mt-1 overflow-auto hide-scroll" style={{ gap: 3, height: '1.5rem' }}>
              {props.isLoadingSelected
                ? <LoadingCircle />
                : asset_phase.map(e => (
                  <Chip
                    size="small"
                    className={`${classes.root} text-capitalize`}
                    label={e === 4 ? 'Operation & Maintenance' : capitalize(props.phase[e].toLowerCase())}
                  />
                ))}
            </div>
          </div>
          <div className="my-2">
            <p className="text-light mb-1">Asset {pluralizer('Type', asset_type.length)}</p>
            <div className="d-flex mt-1 overflow-auto hide-scroll" style={{ gap: 3, height: '1.5rem' }}>
              {props.isLoadingSelected
                ? <LoadingCircle />
                : asset_type.filter(f => f !== '3').map(e => (
                  <Chip size="small" className={`${classes.root} text-capitalize`} label={assetNaming(props.assetType[e])} />
                ))}
            </div>
          </div>
          <div className="my-2">
            <Grid container>
              {[
                { title: 'Remark', value: true },
                { title: 'Compliance', value: moduleSettings(data?.settings, 'compliance') },
                { title: 'Severity', value: moduleSettings(data?.settings, 'severity') },
              ].map(e => (
                <Grid xs={6} lg={4}>
                  <p className="text-light mb-1">{e.title}</p>
                  <p style={{ color: 'var(--dark-color)' }}>{e.value ? 'Yes' : 'No'}</p>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Link>
  );
};

const LoadingCircle = () => (
  <div className="d-flex flex-standard w-100">
    <CircularProgress size={16} style={{ color: 'var(--primary-color)' }} />
  </div>
);

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--secondary-color)',
    fontWeight: 400,
    color: 'white',
    padding: 1,
  },
  textLabel: {
    fontWeight: 600, fontSize: '0.8em', color: 'var(--tertiary-color)', cursor: 'pointer',
  },
  textData: { fontWeight: 800, fontSize: 14, color: 'var(--primary-color)' },
});

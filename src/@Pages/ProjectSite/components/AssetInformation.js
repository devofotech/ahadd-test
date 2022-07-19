import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { pluralizer } from '@Helpers';
import _ from 'lodash';

export default (h) => {
  const classes = useStyles();
  const phase = Object.assign({}, ...h.phases?.map(m => ({ [m.id]: m.name })));
  return (
    <div className="d-flex flex-column">
      <AssetPhases selectedPhase={h.project?.selectedPhase} phases={phase} classes={classes} />
      <AssetModule modules={h.modules} classes={classes} module_parameters={h.project?.module_parameters} />
    </div>
  );
};

const AssetPhases = ({ selectedPhase, phases, classes }) => {
  const hasPhase = !!selectedPhase;
  return (
    <>
      <p style={{ color: 'black', fontSize: 10 }}>ASSET {pluralizer('PHASE', selectedPhase.split('').length)}</p>
      <div className="d-flex flex-column text-center">
        <div className="d-flex mt-1 flex-wrap" style={{ gap: 3 }}>
          {hasPhase
            ? selectedPhase.split(',').map(m => <Chip size="small" className={`${classes.root} text-capitalize`} label={phases[m]?.toLowerCase()} />)
            : <Chip size="small" label="None" />}
        </div>
      </div>
    </>
  );
};

const AssetModule = ({ module_parameters, classes, modules }) => {
  const hasModule = !!module_parameters;
  return (
    <>
      <p style={{ color: 'black', fontSize: 10, marginTop: 10 }}>ANNOTATION {pluralizer('MODULE', modules.length)}</p>
      <div className="d-flex flex-column text-center">
        <div className="d-flex mt-1" style={{ gap: 3 }}>
          {hasModule ? (
            (
              <>
                {modules?.filter(r => _.groupBy(module_parameters, 'ModuleId')[r.id]).map(m => (
                  <Chip className={classes.root} size="small" label={m.name} />))}
              </>
            )
          ) : (<Chip size="small" label="None" />)}
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--secondary-color)',
    textWeight: 600,
    color: 'white',
    padding: 1,
  },
  textLabel: {
    fontWeight: 600, fontSize: '0.8em', color: 'var(--tertiary-color)', cursor: 'pointer',
  },
  textData: { fontWeight: 800, fontSize: 14, color: 'var(--primary-color)' },
});

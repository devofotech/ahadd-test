import React, { useState } from 'react';
import { Chip, CircularProgress, makeStyles } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import _ from 'lodash';

export default ({
  details, phases = [], isLoading, modules,
}) => {
  const classes = useStyles();
  const phase = Object.assign({}, ...phases?.map(m => ({ [m.id]: m.name })));
  return (
    <div className="d-flex flex-column">
      <AssetTag tag={details?.asset_type} classes={classes} isLoading={isLoading} />
      <AssetPhases selectedPhase={details?.selectedPhase} phases={phase} classes={classes} isLoading={isLoading} />
      <AssetModule modules={modules} classes={classes} module_parameters={details?.module_parameters} isLoading={isLoading} />
    </div>
  );
};

const AssetPhases = ({
  selectedPhase, phases, classes, isLoading,
}) => {
  const hasPhase = !!selectedPhase;
  const [isShow, setIsShow] = useState(false);
  const ExpandIcon = !isShow ? ExpandMore : ExpandLess;
  return (
    <div className="d-flex flex-column text-center mt-2">
      <p className={classes.textLabel} onClick={() => setIsShow(!isShow)}>
        Asset Phase<ExpandIcon style={{ fontSize: 14 }} className="color-primary" />
      </p>
      {isShow && (
        <div className="d-flex justify-content-center mt-1 flex-wrap" style={{ gap: 3 }}>
          {hasPhase ? (
            <>
              {isLoading
                ? (<CircularProgress size={18} style={{ color: 'var(--primary-color)' }} />)
                : (
                  <>
                    {selectedPhase.split(',').map(m => (
                      <Chip size="small" className={`${classes.root} text-capitalize`} label={phases[m]?.toLowerCase()} />
                    ))}
                  </>
                )}
            </>
          ) : (
            <Chip size="small" label="None" />
          )}
        </div>
      )}
    </div>
  );
};

const AssetModule = ({
  module_parameters, classes, modules, isLoading,
}) => {
  const hasModule = !!module_parameters;
  const [isShow, setIsShow] = useState(false);
  const ExpandIcon = !isShow ? ExpandMore : ExpandLess;
  return (
    <div className="d-flex flex-column text-center my-2">
      <p className={classes.textLabel} onClick={() => setIsShow(!isShow)}>
        Annotation Module<ExpandIcon style={{ fontSize: 14 }} className="color-primary" />
      </p>
      {isShow && (
        <div className="d-flex justify-content-center mt-1" style={{ gap: 3 }}>
          {hasModule ? (
            <>
              {isLoading
                ? (<CircularProgress size={18} style={{ color: 'var(--primary-color)' }} />)
                : (
                  <>
                    {modules?.filter(r => _.groupBy(module_parameters, 'ModuleId')[r.id]).map(m => (
                      <Chip className={classes.root} size="small" label={m.name} />))}
                  </>
                )}
            </>
          ) : (<Chip size="small" label="None" />)}
        </div>
      )}
    </div>
  );
};

const AssetTag = ({ tag, classes, isLoading }) => {
  const hasTag = !!tag;
  const [isShow, setIsShow] = useState(false);
  const ExpandIcon = !isShow ? ExpandMore : ExpandLess;
  return (
    <div className="d-flex flex-column text-center mt-2">
      <p className={classes.textLabel} onClick={() => setIsShow(!isShow)}>
        Asset Tag<ExpandIcon style={{ fontSize: 14 }} className="color-primary" />
      </p>
      {isShow && (
        <div className="d-flex justify-content-center mt-1" style={{ gap: 3 }}>
          {hasTag ? (
            <>
              {isLoading
                ? (<CircularProgress size={18} style={{ color: 'var(--primary-color)' }} />)
                : (<>{tag.split(',').map(m => (<Chip className={classes.root} size="small" label={m} />))}</>)}
            </>
          ) : (<Chip size="small" label="None" />)}
        </div>
      )}
    </div>
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

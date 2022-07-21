/* eslint-disable complexity */
import { Grid, Chip, makeStyles } from '@material-ui/core';
import _ from 'lodash';

export default (h) => {
  const classes = useStyles();
  const selectedModule = _.filter(h.moduleOption, { value: true });
  const selectedPhase = _.filter(h.assetPhaseList, { value: true });

  return (
    <>
      <h3 className="text-dark my-4">Asset Summary</h3>
      <Grid container className="bg-white p-3 pl-5 position-relative" style={{ borderRadius: 10, height: '60vh' }}>
        <Grid item xs={3}>
          <Grid xs={12}><CustomLabelDataField title="Asset Name" value={h.name} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="Asset Tag" value={h.assetTag} hasChip classStyle={classes.root} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="Location" value={h.location} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="State" value={h.state} /></Grid>
          <Grid xs={12}><CustomLabelDataField title="Asset Type" value={h.selectedTypeProfile.name} /></Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid xs={12}><CustomLabelDataField title="Asset Lifecycle" value={h.lifeCycle} /></Grid>
          <Grid xs={12}><List title="Phase" value={selectedPhase} hasName /></Grid>
          {!!selectedModule.length && <Grid xs={12}><List title="Module" value={selectedModule} /></Grid>}
        </Grid>
        <Grid item xs={4}>
          <p className="text-dark my-2" style={{ fontSize: 14 }}>Parameter</p>
          <Grid container item xs={12} className="overflow-auto" style={{ height: '50vh' }}>
            <Grid item xs={12}><ListParameter data={h.selectedGroupParameter.filter(f => !!f.params.length)} {...h} /></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const CustomLabelDataField = ({
  title, value, hasChip = false, classStyle,
}) => (
  <>
    <p className="text-dark my-2" style={{ fontSize: 14 }}>{title}</p>
    {hasChip ? (
      <div className="d-flex" style={{ flexWrap: 'wrap', gap: 4 }}>
        {!!value ? value.split(',').map(c => (<Chip className={`${classStyle} text-capitalize`} label={c} size="small" />)) : '-'}
      </div>
    ) : (
      <p className="mt-2 mb-3 text-capitalize font-weight-bold" style={{ fontSize: 16 }}>{value || '-'}</p>
    )}
  </>
);

const ListParameter = ({ data, ...h }) => {
  const parameterGroupByPhase = _.groupBy(data, 'ProjectPhaseId');
  const isOSH = name => {
    if (name === 'osh' || name === 'OSH') { return 'Occupational Safety and Health'; }
    if (name === 'O & M') { return 'Operations and Maintenances'; }
    if (['PPE', 'OSH', 'PTW'].includes(name)) { return name.toUpperCase(); }
    return name.toLowerCase();
  };
  return (
    <div className="mb-3">
      {Object.keys(parameterGroupByPhase).map(m => (
        <>
          <p className="text-dark my-2" style={{ fontSize: 14 }}>{h.assetPhaseList.find(x => x.id === Number(m))?.name}</p>
          <>
            {parameterGroupByPhase[m].map(e => (
              <>
                <p className="ml-2 my-2" style={{ fontSize: 14 }}>
                  {h.modules.find(x => x.id === Number(e.ModuleId)).name}
                </p>
                <ul>
                  {e.params.map(r => (
                    <li>
                      <p className="my-1 text-capitalize font-weight-bold" style={{ fontSize: 16 }}>{isOSH(r.name)}</p>
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </>
        </>
      ))}
    </div>
  );
};

const List = ({
  title, titleParams, value, hasName,
}) => {
  const isOSH = name => {
    if (name === 'osh' || name === 'OSH') { return 'Occupational Safety and Health'; }
    if (name === 'O & M') { return 'Operations and Maintenances'; }
    if (['PPE', 'OSH', 'PTW'].includes(name)) { return name.toUpperCase(); }
    return name.toLowerCase();
  };
  return (
    <div className="mb-3">
      {!!title && <p className="text-dark my-2" style={{ fontSize: 14 }}>{title}</p>}
      {!!titleParams && <p className="my-2" style={{ fontSize: 14 }}>{titleParams}</p>}
      <ul>
        {value.map(list => (
          <li>
            <p className="my-1 text-capitalize font-weight-bold" style={{ fontSize: 16 }}>
              {isOSH(hasName ? list.name : list.label)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--primary-color)',
    textWeight: 600,
    color: 'white',
  },
});

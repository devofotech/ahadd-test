import { Grid, Tooltip, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InfoOutlined } from '@material-ui/icons';
import SwitchButton from '@Components/SwitchButton';
import { capitalize, moduleSettings } from '@Helpers';

export default function index({
  toggleSwitchAssetType = () => null, toggleSwitchPhase = () => null, toggleSwitchSettings = () => null, ...h
}) {
  const assetTypeList = Object.keys(h.assetType).map((k) => ({ id: Number(k), name: h.assetType[k] }));
  const phaseList = Object.keys(h.phase).map((k) => ({ id: Number(k), name: h.phase[k] }));
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid xs={4} item>
        <h1 className={classes.subtitle}>Asset Type</h1>
        {
          h.isLoadingSelected
            ? <LoadingCircle />
            : assetTypeList.filter(f => f.id !== 3).map(m => (
              <div className="d-flex justify-content-between mb-1">
                <p>{m.name}</p>
                <SwitchButton value={m.id} checked={h.selectedAssetType.includes(m.id)} onChange={toggleSwitchAssetType} />
              </div>
            ))
        }
      </Grid>
      <Grid xs={4} item>
        <h1 className={classes.subtitle}>Phase</h1>
        {
          h.isLoadingSelected
            ? <LoadingCircle />
            : phaseList.filter(f => ![2, 5].includes(f.id)).map(m => (
              <div className="d-flex justify-content-between mb-1">
                <p>{m.id === 4 ? 'Operation & Maintenance' : capitalize(m.name.toLowerCase())}</p>
                <SwitchButton value={m.id} checked={h.selectedPhase.includes(m.id)} onChange={toggleSwitchPhase} />
              </div>
            ))
        }
      </Grid>
      <Grid xs={4} item>
        <h1 className={classes.subtitle}>Settings</h1>
        {
          h.isLoadingSelected
            ? <LoadingCircle />
            : [
              {
                label: 'Compliance',
                name: 'compliance',
                checked: moduleSettings(h.module?.settings, 'compliance'),
              },
              {
                label: 'Severity',
                name: 'severity',
                checked: moduleSettings(h.module?.settings, 'severity'),
                tooltip: 'In situation where compliance status is a selected option, severity input will only be visible when the annotated item is under non-compliance status',
              },
              {
                label: 'Custom Parameter',
                name: 'custom_parameter',
                checked: moduleSettings(h.module?.settings, 'custom_parameter'),
                tooltip: 'Allow new asset to customize during asset creation process.',
              },
            ].map((m) => (
              <div className="d-flex justify-content-between mb-1">
                <p>
                  {m.label}
                  {!!m.tooltip && <InfoToolTip title={m.tooltip} />}
                </p>
                <SwitchButton value={m.name} checked={h.selectedSettings.includes(m.name)} onChange={toggleSwitchSettings} />
              </div>
            ))
        }
      </Grid>
    </Grid>
  );
}

const InfoToolTip = ({ title }) => (
  <Tooltip title={title}>
    <InfoOutlined style={{
      cursor: 'pointer', fontSize: 18, marginLeft: 5, color: 'var(--primary-color)',
    }}
    />
  </Tooltip>
);

const LoadingCircle = () => (
  <div className="d-flex flex-standard w-100 h-75">
    <CircularProgress size={30} style={{ color: 'var(--primary-color)' }} />
  </div>
);

const useStyles = makeStyles(() => ({
  subtitle: {
    fontSize: 14, fontWeight: 'bold', color: '#8B95AB', marginBottom: 10,
  },
  container: { minHeight: '10rem', flex: '0 0 auto' },
}));

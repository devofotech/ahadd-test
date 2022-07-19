import {
  Grid, Checkbox, FormControlLabel, CircularProgress,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomParameter from './components/CustomParameter';

export default function index({ handleUpdateParameter, isCreate = false, ...h }) {
  const classes = useStyles();
  return (
    <>
      <div className="mt-2" style={{ flex: '0 0 auto' }}>
        <h1 className={classes.subtitle}>Parameter</h1>
      </div>
      {
        h.isLoadingSelected
          ? <LoadingCircle />
          : (
            <div className="hide-scroll" style={{ flex: '0 1 auto', overflowY: 'scroll', overflowX: 'hidden' }}>
              <Grid container spacing={1}>
                <Grid xs={4} item className="w-100">
                  <CustomParameter list={h.parameter} {...h} isCreate={isCreate} />
                </Grid>
                {h.parameter.map(m => (
                  <Grid xs={4} item className="w-100">
                    <CustomCheckbox
                      option={m}
                      handleUpdateParameter={handleUpdateParameter}
                      isCreate={isCreate}
                      hasLabel
                      parameter
                      label={m.label}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          )
      }
    </>
  );
}

const CustomCheckbox = (props) => {
  return (
    <>
      <FormControlLabel
        control={(
          <GreenCheckbox
            checked={!!props.option.is_active}
            name={props.label}
            onChange={event => props.handleUpdateParameter(event, props.option.id)}
            {...props}
          />
        )}
        label={props.label}
        className="rounded"
        style={{
          marginLeft: 0.5,
          width: '99%',
          border: '1px solid var(--secondary-color)',
          backgroundColor: props.option?.value ? '#EDF5F4' : '#fff',
        }}
      />
    </>
  );
};

const LoadingCircle = () => (
  <div className="w-100 h-75 flex-standard" style={{ flex: '0 1 auto' }}>
    <CircularProgress size={50} style={{ color: 'var(--primary-color)' }} />
  </div>
);

const GreenCheckbox = withStyles({
  root: {
    color: '#04847C',
    '&$checked': {
      color: '#04847C',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(() => ({
  subtitle: {
    fontSize: 14, fontWeight: 'bold', color: '#8B95AB', marginBottom: 10,
  },
}));

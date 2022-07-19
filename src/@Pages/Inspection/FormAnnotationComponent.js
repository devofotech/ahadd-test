/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import {
  Paper, Typography, Select, Radio, RadioGroup, FormControlLabel,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  radio: { margin: '-11px !important', padding: '1px !important' },
}));

const GreenRadio = withStyles({
  root: { '&$checked': { color: green[600] } },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const dummy_data = {
  name: 'comp',
  items: [
    { label: 'Non Compliance', value: 0 },
    { label: 'Compliance', value: 1 },
  ],
};

export const CustomSelect = ({
  value, items, onChange, ...props
}) => (
  <Select
    disableUnderline
    native
    value={value}
    onChange={onChange}
    className={props.classes.outlineSelect}
    style={{ ...(props.selectedStyle.actbgchild) }}
  >
    {items.map(opt => <option value={opt.id}>{opt.name}</option>)}
  </Select>
);
export const CustomRadioOSH = ({ name, items, ...props }) => (
  <RadioGroup name={name} value={!props.annotation.is_compliance ? 0 : 1} onChange={props.FAh.handleChangeCompliance}>
    {items.map(({ value, label }) => (
      <FormControlLabel
        value={value}
        control={label === 'Compliance' ? <GreenRadio /> : <Radio />}
        label={<Typography style={{ fontSize: '10px', ...(props.selectedStyle.actbg) }}>{label}</Typography>}
      />
    ))}
  </RadioGroup>
);

export const CustomRadioSeverity = ({ name, items, ...props }) => {
  const classes = useStyles();
  return (
    <RadioGroup name={name} row value={props.props.annotation?.SeverityId ?? items[0]?.id} onChange={props.FAh.handleChangeSeverity} className="d-flex justify-content-around mb-3">
      {items.map(({ id, name: itemName, colour }) => (
        <FormControlLabel
          className={classes.radio}
          value={id}
          control={<Radio style={{ color: colour && `#${colour}` }} />}
          label={<Typography style={{ fontSize: '10px', ...(props.selectedStyle.actbg) }}>&nbsp;&nbsp;{itemName}&nbsp;&nbsp;</Typography>}
          labelPlacement="bottom"
        />
      ))}
    </RadioGroup>
  );
};

export const DynamicHeader = ({ classes, selectedStyle, props }) => (
  <Paper className={classes.normalSelectNoItem} style={{ ...(selectedStyle.actbgchild) }}>
    {`${props.inspection_module.name} CATEGORY`}
  </Paper>
);

export const DynamicSelect = ({
  classes, selectedStyle, FAh, props,
}) => (
  <CustomSelect
    value={props.annotation.ModuleParameterId}
    items={props.inspection_module.ModuleParameters}
    onChange={FAh.handleChangeParameter}
    {...{ classes, selectedStyle, FAh, ...props }}
  />
);

export const DynamicRadio = ({
  classes, selectedStyle, FAh, props,
}) => <CustomRadioOSH {...dummy_data} {...{ classes, selectedStyle, FAh, ...props }} />;

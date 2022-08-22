import {
  Select, MenuItem, Checkbox, FormControl, ListItemText, OutlinedInput, Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      paddingRight: 20,
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

export default function SortDropdown(props) {
  const classes = useStyles();
  return (
    <FormControl style={{ minWidth: '8vw' }} size="small">
      <Select
        style={{ borderRadius: 30 }}
        className={classes.root}
        multiple
        displayEmpty
        value={props.selected}
        onChange={(e) => props.setSelected(e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <div className="d-flex align-items-center">
            <span style={{ color: 'var(--dark-blue-color)' }}>{props.title}</span>&nbsp;
            {selected.length === 0 ? (
              <Chip label={selected.length} size="small" style={{ transform: 'scale(0.8)', backgroundColor: 'transparent', color: 'transparent' }} />
            ) : (
              <Chip label={selected.length} size="small" style={{ transform: 'scale(0.8)', backgroundColor: 'var(--dark-blue-color)', color: 'white' }} />
            )}
          </div>
        )}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps}
      >
        {props.data.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            <Checkbox
              checked={props.selected.includes(d.value)}
              style={{ color: 'var(--primary-color)' }}
            />
            <ListItemText primary={d.label} style={{ color: 'var(--dark-blue-color)' }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    transform: 'scale(0.9) translate(-10%, 0)',
    height: '80%',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
}));

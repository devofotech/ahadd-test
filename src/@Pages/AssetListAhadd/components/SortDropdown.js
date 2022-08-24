import { useState } from 'react';
import {
  Select, MenuItem, Checkbox, FormControl, ListItemText, OutlinedInput, Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
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

export default function SortDropdown() {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState(0);

  const sort = [
    {
      value: 1,
      label: 'Alphabetically',
    },
    {
      value: 2,
      label: 'Date Created',
    },
  ];

  return (
    <FormControl style={{ minWidth: '9rem' }} size="small">
      <Select
        className={classes.root}
        style={{ borderRadius: 30 }}
        displayEmpty
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps}
      >
        <MenuItem value={0}>
          <span style={{ color: 'var(--secondary-color)' }}>Sort By</span>
        </MenuItem>
        {sort.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            {d.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    transform: 'scale(0.85)',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
}));

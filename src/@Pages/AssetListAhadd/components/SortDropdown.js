import { useState } from 'react';
import {
  Select, MenuItem, Checkbox, FormControl, ListItemText, OutlinedInput, Chip,
} from '@material-ui/core';

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
  const [sortBy, setSortBy] = useState('');

  const sort = [
    {
      value: 0,
      label: 'Alphabetically',
    },
    {
      value: 1,
      label: 'Date Created',
    },
  ];

  return (
    <FormControl style={{ m: 1, width: '10vw', marginLeft: 10, marginRight: 10 }} size="small">
      <Select
        style={{ borderRadius: 30 }}
        displayEmpty
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        input={<OutlinedInput />}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
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

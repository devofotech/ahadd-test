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
  const [network, setNetwork] = useState([]);

  const networks = [
    {
      value: 0,
      label: 'BKE',
    },
    {
      value: 1,
      label: 'LPT2',
    },
  ];

  return (
    <FormControl style={{ m: 1, width: '8vw', marginLeft: 10 }} size="small">
      <Select
        style={{ borderRadius: 30, height: '4vh'}}
        multiple
        displayEmpty
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <div className="d-flex align-items-center">
            <span style={{ color: 'var(--main-color)' }}>Network</span>&nbsp;
            {selected.length === 0 ? (
              <Chip label={selected.length} size="small" style={{ transform: 'scale(0.8)', backgroundColor: 'transparent', color: 'transparent' }} />
            ) : (
              <Chip label={selected.length} size="small" style={{ transform: 'scale(0.8)', backgroundColor: 'var(--main-color)', color: 'white' }} />
            )}
          </div>
        )}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em>Network</em>
        </MenuItem>
        {networks.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            <Checkbox
              checked={network.includes(d.value)}
              style={{ color: 'var(--main-color)' }}
            />
            <ListItemText primary={d.label} style={{ color: 'var(--main-color)' }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

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
  const [ranking, setRanking] = useState([]);

  const rankings = [
    {
      value: 0,
      label: 'North',
    },
    {
      value: 1,
      label: 'Central',
    },
    {
      value: 2,
      label: 'South',
    },
  ];

  return (
    <FormControl style={{ m: 1, width: '8vw' }} size="small">
      <Select
        style={{ borderRadius: 30, height: '4vh' }}
        multiple
        displayEmpty
        value={ranking}
        onChange={(e) => setRanking(e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <div className="d-flex align-items-center">
            <span style={{ color: 'var(--main-color)' }}>Ranking</span>&nbsp;
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
          <em>Ranking</em>
        </MenuItem>
        {rankings.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            <Checkbox
              checked={ranking.includes(d.value)}
              style={{ color: 'linear-gradient(var(--main-color), var(--primary-color))' }}
            />
            <ListItemText primary={d.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

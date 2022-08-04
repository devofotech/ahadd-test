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
  const [section, setSection] = useState([]);

  const sections = [
    {
      value: 0,
      label: 'N1',
    },
    {
      value: 1,
      label: 'N2',
    },
    {
      value: 2,
      label: 'N3',
    },
    {
      value: 3,
      label: 'N4',
    },
    {
      value: 4,
      label: 'N5',
    },
    {
      value: 5,
      label: 'N6',
    },
    {
      value: 6,
      label: 'N7',
    },
  ];

  return (
    <FormControl style={{ m: 1, width: '8vw', marginLeft: 10, marginRight: 10 }} size="small">
      <Select
        style={{ borderRadius: 30, height: '4vh'}}
        multiple
        displayEmpty
        value={section}
        onChange={(e) => setSection(e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <div className="d-flex align-items-center">
            <span style={{ color: 'var(--main-color)' }}>Section</span>&nbsp;
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
          <em>Section</em>
        </MenuItem>
        {sections.map((d) => (
          <MenuItem key={d.value} value={d.value}>
            <Checkbox
              checked={section.includes(d.value)}
              style={{ color: 'linear-gradient(var(--main-color), var(--primary-color))' }}
            />
            <ListItemText primary={d.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

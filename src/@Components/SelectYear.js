import React, { useState, useEffect } from 'react';
import { InputBase, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const currentYear = (new Date()).getFullYear();
const years = [];
for (let i = -5; i <= 5; i++) years.push(currentYear + i);
export default props => {
  const [year, setYear] = useState(props.year || currentYear);

  useEffect(() => {
    if (props.onChange) props.onChange(year);
  }, [year]);

  return (
    <Select
      value={year}
      onChange={e => setYear(e.target.value)}
      input={<BootstrapInput />}
      fullWidth
    >
      {years.map(y => <MenuItem value={y}>{y}</MenuItem>)}
    </Select>
  );
};

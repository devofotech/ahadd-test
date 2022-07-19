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

const currentMonth = (new Date()).getMonth() + 1;
export default props => {
  const [month, setMonth] = useState(props.month || currentMonth);

  useEffect(() => {
    if (props.onChange) props.onChange(month);
  }, [month]);

  return (
    <Select
      value={month}
      onChange={e => setMonth(e.target.value)}
      input={<BootstrapInput />}
      fullWidth
    >
      <MenuItem value={1}>January</MenuItem>
      <MenuItem value={2}>February</MenuItem>
      <MenuItem value={3}>March</MenuItem>
      <MenuItem value={4}>April</MenuItem>
      <MenuItem value={5}>May</MenuItem>
      <MenuItem value={6}>June</MenuItem>
      <MenuItem value={7}>July</MenuItem>
      <MenuItem value={8}>August</MenuItem>
      <MenuItem value={9}>September</MenuItem>
      <MenuItem value={10}>October</MenuItem>
      <MenuItem value={11}>November</MenuItem>
      <MenuItem value={12}>December</MenuItem>
    </Select>
  );
};

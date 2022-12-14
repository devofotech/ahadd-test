import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Button, MenuItem, FormControl, Select,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { primaryColor } from '@Assets/css/index';

const useStyles = makeStyles(() => ({
  formControlContainer: {
    height: '0',
  },
  formControl: {
    width: '100%',
    visibility: 'hidden',
    padding: 0,
  },
}));

const StyledMenuItem = withStyles(() => ({
  root: {
    justifyContent: 'center',
    backgroundColor: 'var(--dark-blue-color)',
    '& h1, h2, h3, h4, h5, h6': {
      textAlign: 'center',
      color: 'white',
    },
    '&:focus, &:hover': {
      backgroundColor: 'white',
      '& h1, h2, h3, h4, h5, h6': {
        color: 'var(--dark-blue-color)',
      },
    },
  },
}))(MenuItem);

export default function Dropdown({
  selectedItem = 0, setSelectedItem, itemList, width, propertyValue, Hx = 'h3', size, xtraText = '', isNonIndexId = false,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const newValue = isNonIndexId ? (event.target.value + 1) : event.target.value;
    setSelectedItem(newValue);
  };
  selectedItem = isNonIndexId ? (selectedItem - 1) : selectedItem;

  return (
    <div>
      <Button
        onClick={handleClick}
        endIcon={<ExpandMore style={{ color: 'var(--dark-blue-color)' }} />}
        style={{
          width: width || '100%',
          height: (size === 'small') ? '40px' : '55px',
          borderRadius: 10,
          // backgroundColor: primaryColor,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: 'normal',
        }}
      >
        <div />
        <div>
          <Hx style={{ color: 'var(--dark-blue-color)', fontSize: '15px', fontWeight: 700 }}>
            {selectedItem < itemList.length ? itemList[selectedItem] : xtraText}
          </Hx>
        </div>
      </Button>
      <div className={classes.formControlContainer}>
        <FormControl className={classes.formControl}>
          <Select
            open={Boolean(anchorEl)}
            onClose={handleClose}
            value={selectedItem}
            onChange={handleChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              getContentAnchorEl: null,
              MenuListProps: { disablePadding: true },
            }}
          >
            {itemList?.map((m, i) => (
              <StyledMenuItem
                selected={selectedItem === i}
                value={i}
                dense
              >
                <Hx>{m}</Hx>
              </StyledMenuItem>
            ))}
            {!!xtraText && (
              <StyledMenuItem
                selected={selectedItem >= itemList.length}
                value={itemList.length}
                dense
              >
                <Hx>{xtraText}</Hx>
              </StyledMenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

import * as React from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {props.options.length < 2 ? (
        <Link to={{ pathname: props.options[0].path }} target="_blank">
          <ButtonGroup aria-label="split button">
            <Button style={props.style}>
              <GetApp style={{ paddingTop: 1, width: '15%' }} />
              <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Download" />
            </Button>
          </ButtonGroup>
        </Link>
      ) : (
        <ButtonGroup ref={anchorRef} aria-label="split button">
          <Button onClick={handleToggle} style={props.style}>
            <GetApp style={{ paddingTop: 1, width: '15%' }} />
            <span style={{ fontSize: 12, textTransform: 'capitalize' }} children="&nbsp;Download" />
          </Button>
        </ButtonGroup>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              position: 'fixed', bottom: 'unset', right: 'unset', top: 0, left: 0,
            }}
          >
            <Paper style={{ width: 'max-content' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {props.options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      href={option.path}
                      target="_blank"
                      component="a"
                      onClick={() => setOpen(false)}
                    >
                      <GetApp style={{ paddingTop: 1, width: '15%' }} /> {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

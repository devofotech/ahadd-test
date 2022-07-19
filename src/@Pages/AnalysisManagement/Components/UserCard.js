/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useRef, useState } from 'react';
import {
  ClickAwayListener, MenuList, MenuItem, Popover,
} from '@material-ui/core';
import DotVerticalIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import AvatarIcon from '@Components/AvatarIcon';

export default ({
  isCreate = false, isList = false, removeUser = () => null, ...props
}) => {
  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setAnchorEl(null);
    }
  }
  return (
    <>
      <div className="d-flex mb-2 align-items-center position-relative">
        <AvatarIcon
          user={props}
          size="2rem"
          fontSize="12px"
        />
        <div className="flex-column mx-2">
          <p style={{ fontSize: 14 }}>{props.name}</p>
          <p style={{ fontSize: 12, color: '#83858A' }}>{props.role}</p>
        </div>
        {isCreate && (
          <>
            {isList ? (
              <DeleteIcon
                fontSize="small"
                className="position-absolute"
                style={{
                  color: 'red', top: 10, right: 0, cursor: 'pointer',
                }}
                onClick={() => removeUser(props)}
              />
            ) : (
              <DotVerticalIcon
                fontSize="small"
                className="position-absolute"
                style={{
                  color: '#C8CBD3', top: 10, right: -5, cursor: 'pointer',
                }}
                ref={anchorRef}
                onClick={handleClick}
              />
            )}
          </>
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
            <MenuItem onClick={() => { removeUser(props); handleClose(); }}><p style={{ color: 'red', fontSize: 14 }}>Delete</p></MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </>
  );
};

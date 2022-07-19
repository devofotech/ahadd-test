import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import UserCard from './UserCard';

export default ({
  members = [], setMembers, membersOption, setMembersOption, isUpdate, handleChange = () => null, ...props
}) => {
  const anchorRef = useRef(null);
  const [openCustomMenu, setOpenCustomMenu] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const [isZoom, setIsZoom] = useState(0);

  const handleToggle = () => setOpenCustomMenu((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpenCustomMenu(false);
  };
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenCustomMenu(false);
    }
  };
  const addUser = (user) => {
    setMembers([...members, user]);
    const filteredMember = membersOption.filter(f => f.id !== user.id);
    setMembersOption(filteredMember);
    if (isUpdate) handleChange();
  };

  window.onresize = function onresize() { setIsZoom((prev) => prev + 1); };
  useEffect(() => {
    if (anchorRef.current) { setMenuWidth(anchorRef.current.clientWidth); }
  }, [anchorRef, isZoom, openCustomMenu]);
  return (
    <div className="d-flex mt-3">
      <AddMembersButton
        id="dropdown-button"
        ref={anchorRef}
        onClick={handleToggle}
        variant="outlined"
        fullWidth
        size="small"
        className="d-flex justify-content-between mx-2"
      >
        <div className="flex-standard" style={{ fontFamily: 'CeraProRegular', fontWeight: 600 }}>
          <AddIcon fontSize="small" />
          {props.label}
        </div>
        <ExpandMoreIcon fontSize="small" />
      </AddMembersButton>
      <Popper
        open={openCustomMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1, width: menuWidth }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className="hide-scroll" style={{ maxHeight: '10rem', overflow: 'auto' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openCustomMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {!!membersOption?.length
                    ? membersOption?.map(m => (
                      <MenuItem onClick={() => addUser(m)}><UserCard {...m} /></MenuItem>
                    ))
                    : (<MenuItem className="w-100"><p style={{ height: 20, fontSize: 14, textAlign: 'center' }}>No user found</p></MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const AddMembersButton = styled(Button)(() => ({
  backgroundColor: '#FFF',
  color: 'var(--active-color)',
  border: '2px solid var(--active-color)',
  paddingBottom: '3px !important',
}));

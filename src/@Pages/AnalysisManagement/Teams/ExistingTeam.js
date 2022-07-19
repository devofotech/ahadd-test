/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import {
  TextField, ClickAwayListener, MenuList, MenuItem, Popover, Box,
} from '@material-ui/core';
import DotHorizontalIcon from '@material-ui/icons/MoreHoriz';
import Button from '@Components/Button';
import { SliderPicker } from 'react-color';
import AvatarIcon from '@Components/AvatarIcon';
import DropdownMenu from '../Components/DropdownMenu';
import UserCard from '../Components/UserCard';
import OrganizationAccess from './OrganizationAccess';

const fontFamily = 'CeraProRegular';

export default ({ user, index, ...props }) => {
  const [name, setName] = useState(props.name ?? '');
  const [description, setDescription] = useState(props.description ?? '');
  const [color, setColor] = useState(!!props.colour ? (props.colour.split('')[0] === '#' ? props.colour : `#${props.colour}`) : 'white');
  const [members, setMembers] = useState([]);
  const [membersOption, setMembersOption] = useState([]);
  const [openPicker, setOpenPicker] = useState({});
  const [isChanging, setIsChanging] = useState(false);
  const handleChange = () => setIsChanging(true);
  const removeUser = (deletedUser) => {
    membersOption.push(deletedUser);
    const memberList = members.filter(f => f.id !== deletedUser.id);
    setMembers(memberList);
    handleChange();
  };

  const onSave = () => {
    props.updateTeam(props.id, name, description, color.replace(/#(?=\S)/g, ''), members);
    setIsChanging(false);
    setOpenPicker({ [index]: !true });
  };

  useEffect(() => {
    const filteredMemberList = user.filter(f => f.TeamId === props.id);
    setMembers(filteredMemberList);
    const filteredMember = user.filter(f => !f.TeamId);
    setMembersOption(filteredMember);
  }, [user]);

  const ColorPickerDialog = () => (
    <Box
      className="position-absolute p-4 rounded w-100"
      style={{
        top: '0rem',
        left: '3.5rem',
        backgroundColor: '#FFF',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        zIndex: 99,
      }}
    >
      <div
        className="position-absolute flex-standard pointer"
        style={CloseIconStyle}
        onClick={() => setOpenPicker({ [index]: !openPicker[index] })}
      >X
      </div>
      <SliderPicker
        color={color}
        onChangeComplete={(values) => {
          setColor(values.hex);
          handleChange();
        }}
      />
    </Box>
  );

  return (
    <div className="px-2 py-4 position-relative" style={{ height: '90%' }}>
      <PopoverOption deleteTeam={props.deleteTeam} {...props} />
      <div className="d-flex align-items-center">
        <div className="position-relative">
          <AvatarIcon
            user={props}
            size="1.5rem"
            fontSize="18px"
            colorType="inherit"
            backgroundColor={color}
            style={{ ...AvatarStyle, color: !props.colour ? 'black' : 'white' }}
            onClick={() => setOpenPicker({ [index]: !openPicker[index] })}
          />
          {openPicker[index] && (<ColorPickerDialog />)}
        </div>
        <div className="d-flex flex-column">
          {
            [
              {
                placeholder: 'Team Name', value: name, onChange: (e) => { setName(e.target.value); handleChange(); }, style: { fontSize: 16, fontFamily },
              },
              {
                placeholder: 'Team Description', value: description, onChange: (e) => { setDescription(e.target.value); handleChange(); }, style: { fontSize: 12, fontFamily },
              },
            ].map(m => (
              <TextField
                {...m}
                InputProps={{ disableUnderline: true, style: { ...m.style, cursor: 'pointer' } }}
                size="small"
              />
            ))
          }
        </div>
      </div>
      <DropdownMenu
        label="Add Team Member"
        members={members}
        setMembers={setMembers}
        membersOption={membersOption}
        setMembersOption={setMembersOption}
        isUpdate
        handleChange={handleChange}
      />
      <div className="d-flex flex-column mt-2 mx-2 hide-scroll" style={{ height: '12rem', overflowY: 'auto', overflowX: 'hidden' }}>
        {members.map(m => (
          <UserCard isCreate removeUser={removeUser} {...m} />
        ))}
      </div>
      {isChanging && (
        <Button
          size="small"
          className="position-absolute"
          style={{ bottom: 25, right: 10 }}
          onClick={() => onSave()}
        >
          Save
        </Button>
      )}
    </div>
  );
};

const PopoverOption = ({ deleteTeam = () => null, ...props }) => {
  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAccess, setOpenAccess] = useState(false);
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
      <DotHorizontalIcon
        fontSize="medium"
        className="position-absolute"
        style={{
          color: '#C8CBD3', top: 5, right: 10, cursor: 'pointer',
        }}
        ref={anchorRef}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
            <MenuItem onClick={() => setOpenAccess(true)}><p style={{ fontSize: 14 }}>View Asset Access</p></MenuItem>
            <MenuItem onClick={() => { deleteTeam(props.id); handleClose(); }}><p style={{ color: 'red', fontSize: 14 }}>Delete Team</p></MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
      <OrganizationAccess open={openAccess} setOpen={setOpenAccess} {...props} />
    </>
  );
};

const AvatarStyle = {
  width: '3.5em',
  height: '3.5em',
  borderRadius: '50%',
  outline: '1px solid #C8CBD3',
  fontSize: '14px',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  marginInline: '0.5rem',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  cursor: 'pointer',
};

const CloseIconStyle = {
  top: -5, right: -5, height: 15, width: 15, backgroundColor: 'red', color: 'white', fontSize: 10, padding: 0.5, borderRadius: 5,
};

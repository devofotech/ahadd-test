import React, { useState, useRef } from 'react';
import {
  Popover, ClickAwayListener, MenuList, MenuItem, Avatar, Tooltip,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import DotHorizontalIcon from '@material-ui/icons/MoreHoriz';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AvatarIcon from '@Components/AvatarIcon';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';

const animatedComponents = makeAnimated();

export default ({
  data, roleType, roleOptions, ...props
}) => {
  const [onIconHover, setOnIconHover] = useState({});
  const selectedOption = (value) => ({ label: roleType?.find(e => e.value === value)?.name, value });
  const onAddRole = (e, id) => {
    const roles = e.map(m => m.value).join(',');
    props.onUpdateWorkflowTeam(id, !!roles ? roles : null);
  };
  return (
    <div>
      <PopoverOption deleteTeam={props.onDeleteWorkflowTeam} {...data} />
      <div className="w-100 d-flex">
        <div className="flex-auto">
          <AvatarIcon
            user={data.Team}
            size="1.5rem"
            fontSize="18px"
            colorType="inherit"
            backgroundColor={!!data.Team?.colour ? `#${data.Team?.colour}` : 'white'}
            style={{ ...AvatarStyle, color: !data.Team?.colour ? 'black' : 'white' }}
          />
        </div>
        <div style={{ flexGrow: 8 }}>
          <p style={{ fontSize: 16, marginTop: 2 }}>{data.Team?.name}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p style={{ fontSize: 12, marginTop: 4, color: 'grey' }}>Team members:</p>
            <AvatarGroupIcon max={3}>
              {data.Team?.Users.map((u, i) => (
                <Tooltip title={u.name}>
                  <Avatar
                    style={{
                      backgroundColor: `#${ Math.floor(Math.random() * 16777215).toString(16)}`,
                      height: '15px',
                      width: '15px',
                      fontSize: 8,
                      zIndex: onIconHover[i] ? 999 : !i ? 10 : 1,
                    }}
                    alt={u.name}
                    src={`${process.env.REACT_APP_S3}/${u?.image}`}
                    onMouseOver={() => setOnIconHover({ [i]: !onIconHover[i] })}
                    onMouseLeave={() => setOnIconHover({ [i]: !!onIconHover[i] })}
                  />
                </Tooltip>
              ))}
            </AvatarGroupIcon>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {!!roleType?.length ? (
          <>
            <text style={{ fontSize: 9, marginBottom: 2, color: 'grey' }}>Team role (you may assign multiple):</text>
            <Select
              placeholder="ASSIGN TEAM ROLE"
              styles={{
                control: styles => ({ ...styles, border: '2px solid var(--active-color)', display: 'flex' }),
                container: provided => ({ ...provided, width: 'auto', fontSize: 12, fontFamily: 'CeraProRegular' }),
                dropdownIndicator: provided => ({ ...provided, color: 'var(--active-color)' }),
                placeholder: provided => ({ ...provided, color: 'var(--active-color)' }),
                indicatorSeparator: provided => ({ ...provided, opacity: 0 }),
                clearIndicator: provided => ({ ...provided, opacity: 0 }),
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={!data.issue ? [] : data.issue?.split(',').map(e => selectedOption(e))}
              onChange={e => onAddRole(e, data.id)}
              options={roleOptions?.map(e => ({ label: e.name, value: e.value }))}
              isMulti
            />
          </>
        ) : <CenteredLoadingContainer size={24} height="75px" />}
      </div>
    </div>
  );
};

const PopoverOption = ({ deleteTeam = () => null, ...props }) => {
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
      <DotHorizontalIcon
        fontSize="medium"
        className="position-absolute"
        style={{
          color: '#C8CBD3', top: 10, right: 15, cursor: 'pointer',
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
            <MenuItem onClick={() => { deleteTeam(props.id); handleClose(); }}><p style={{ color: 'red', fontSize: 14 }}>Delete Team</p></MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popover>
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
  marginRight: '0.5rem',
};

const AvatarGroupIcon = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    height: '15px',
    width: '15px',
    fontSize: 8,
    backgroundColor: `#${ Math.floor(Math.random() * 16777215).toString(16)}`,
    '&:hover': {
      zIndex: '999 !important',
    },
  },
});

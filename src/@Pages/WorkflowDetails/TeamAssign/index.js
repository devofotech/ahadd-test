/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useRef } from 'react';
import {
  Grid, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AvatarIcon from '@Components/AvatarIcon';
import Card from '@Components/CustomCard3';
import NoData from '@Assets/Images/Data-not-found3.svg';
import TeamMember from './TeamMember';

export default ({ workflow, teams, roleType, ...props }) => {
  const anchorRef = useRef(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [openCustomMenu, setOpenCustomMenu] = useState(false);
  const [teamOptions, setTeamOptions] = useState([]);
  const workflowTeams = workflow?.WorkflowTeams ?? [];

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

  useEffect(() => {
    const teamInWorkflow = workflowTeams.map(wt => wt.Team?.id);
    const teamNotInWorkflow = teams.filter(team => !teamInWorkflow.includes(team.id));
    setTeamOptions(teamNotInWorkflow);
  }, [workflowTeams, teams]);

  useEffect(() => {
    if (!workflowTeams?.length) return;
    const selectedRoles = workflowTeams.map(wft => wft.issue).filter(iss => !!iss).join(',').split(',');
    const notSelectedRoles = roleType?.filter(r => !selectedRoles.includes(r.value));
    setRoleOptions(notSelectedRoles);
  }, [workflow, roleType]);

  return (
    <div className="d-flex flex-column" style={{ marginTop: '2.7rem' }}>
      <h1
        className="d-flex align-items-center"
        style={{
          fontSize: 14, fontWeight: 'bold', color: '#8B95AB', marginBottom: 10, gap: 2,
        }}
      >
        Teams Assigned
        <AddBoxIcon
          className="color-primary pointer"
          ref={anchorRef}
          onClick={handleToggle}
        />
      </h1>
      {!!workflowTeams?.length ? (
        <Grid className="d-flex px-1" container spacing={3}>
          {workflowTeams.map(m => (
            <Card
              adjustStyle={{ height: 'auto', minHeight: '8.5rem', maxHeight: '10rem' }}
              className="px-3 py-2"
              isToTheSide={4}
              children={<TeamMember data={m} roleType={roleType} roleOptions={roleOptions} {...props} />}
            />
          ))}
        </Grid>
      ) : (
        <div className="d-flex justify-content-center">
          <img src={NoData} style={{ width: '30vw' }} />
        </div>
      )}
      <Popper open={openCustomMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className="hide-scroll" style={{ maxHeight: '10rem', overflow: 'auto', width: '27vh' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openCustomMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {!!teamOptions.length
                    ? teamOptions.map(m => (
                      <MenuItem><UserCheckedCard onClick={() => props.onAddTeamToWorkflow(m.id, m.description)} {...m} /></MenuItem>
                    ))
                    : (<MenuItem className="w-100"><p style={{ height: 20, fontSize: 14, textAlign: 'center' }}>No team found</p></MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const UserCheckedCard = ({ onClick = () => null, ...props }) => {
  return (
    <div className="d-flex my-2 align-items-center position-relative" onClick={onClick}>
      <AvatarIcon
        user={props}
        size="1.5rem"
        fontSize="18px"
        colorType="inherit"
        backgroundColor={!!props.colour ? `#${props?.colour}` : 'white'}
        style={{ ...AvatarStyle, color: !props.colour ? 'black' : 'white' }}
      />
      <div className="flex-column mx-2">
        <p style={{ fontSize: 14 }}>{props.name}</p>
        <p style={{ fontSize: 12, color: '#83858A' }}>{props.description}</p>
      </div>
    </div>
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
  boxShadow: '0.5px 0.5px 4px 1px rgba(0,0,0,0.1)',
};

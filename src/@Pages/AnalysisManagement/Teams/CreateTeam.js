import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@Components/Button';
import { initialsFromUser } from '@Helpers';
import DropdownMenu from '../Components/DropdownMenu';
import UserCard from '../Components/UserCard';

const fontFamily = 'CeraProRegular';

export default ({ user, ...props }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [membersOption, setMembersOption] = useState([]);
  const removeUser = (deletedUser) => {
    membersOption.push(deletedUser);
    const memberList = members.filter(f => f.id !== deletedUser.id);
    setMembers(memberList);
  };

  useEffect(() => {
    const filteredMember = user.filter(f => !f.TeamId);
    setMembersOption(filteredMember);
  }, [user]);

  const clearForm = () => {
    setName('');
    setDescription('');
    setMembers([]);
  };

  return (
    <div className="px-2 py-4 position-relative" style={{ height: '90%' }}>
      <div className="d-flex align-items-center">
        <div className="flex-standard" style={AvatarStyle}>{initialsFromUser({ name })}</div>
        <div className="d-flex flex-column">
          {
            [
              {
                placeholder: 'Team Name', value: name, onChange: (e) => setName(e.target.value), style: { fontSize: 16, fontFamily },
              },
              {
                placeholder: 'Team Description', value: description, onChange: (e) => setDescription(e.target.value), style: { fontSize: 12, fontFamily },
              },
            ].map((m, i) => (
              <TextField
                {...m}
                InputProps={{
                  disableUnderline: true, minLength: 1, maxLength: !i ? 20 : 40, style: m.style,
                }}
                required
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
      />
      <div className="d-flex flex-column mt-2 mx-2" style={{ height: '10rem', overflowY: 'auto', overflowX: 'hidden' }}>
        {members?.map(m => (
          <UserCard isCreate isList removeUser={removeUser} {...m} />
        ))}
      </div>
      <Button
        size="small"
        className="position-absolute"
        style={{ bottom: 25, right: 10 }}
        disabled={!name && !description}
        onClick={() => props.createTeam(name, description, members, clearForm)}
      >
        Create Team
      </Button>
    </div>
  );
};

const AvatarStyle = {
  width: '3.5em',
  height: '3.5em',
  borderRadius: '50%',
  outline: '1px solid #C8CBD3',
  fontSize: '14px',
  backgroundColor: '#506288',
  color: 'white',
  objectFit: 'cover',
  paddingBottom: '1px',
  marginInline: '0.5rem',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
};

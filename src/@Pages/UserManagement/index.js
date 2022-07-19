import React from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@Components/Pagination';
import DialogCarousel from '@Components/DialogCarousel';
import SearchBox from '@Components/SearchBox';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import UserInfoCard from './components/UserInfoCard';
import AddNewUserDialog from './components/AddNewUserDialog';
import useHook from './hook';
import RoleInformation from './components/RoleInformation';

const TableHeader = (props) => <p className="text-dark" style={{ fontSize: 16 }}>{props.children}</p>;

export default ({ user }) => {
  const h = useHook();
  const team = (teamId) => h.teams.filter(f => f.id === teamId);
  return (
    <div className="p2" style={{ marginInline: '7.5rem' }}>
      <h1
        className="pt-2"
        style={{
          fontWeight: 600,
          fontSize: 28,
          color: 'var(--primary-color)',
        }}
      >
        User Management
      </h1>
      <div className="w-100 mt-3 d-flex justify-content-between">
        <div>
          <SearchBox onChange={(e) => h.setKeyword(e.target.value)} onKeyDown={h.onKeyDown} onClick={h.getUsers} hasOnClick />
          {process.env.REACT_APP_BRANCH === 'galaxy' && <RoleInformation {...h} />}
        </div>
        <div className="d-flex">
          <DialogCarousel title="How to set access" name="page_access" style={{ fontSize: 28 }} />
          <Pagination {...h} />
          <AddNewUserDialog OrganizationId={user?.OrganizationId} user={user} {...h} />
        </div>
      </div>
      <Grid container className="mt-2 mb-1 px-3">
        <Grid item xs={3} />
        <Grid item xs={3} className="d-flex align-items-center"><TableHeader>EMAIL</TableHeader></Grid>
        <Grid item xs={1} className="d-flex align-items-center"><TableHeader>&nbsp;TEAM</TableHeader></Grid>
        <Grid item xs={1} className="d-flex align-items-center"><TableHeader>ROLE</TableHeader></Grid>
        <Grid item xs={1}><TableHeader>{process.env.REACT_APP_BRANCH === 'galaxy' ? 'geoRÄISE' : 'i-Supervision'} ROLE</TableHeader></Grid>
        <Grid item xs={2} className="flex-standard"><TableHeader>ACTION</TableHeader></Grid>
      </Grid>
      {h.isLoading && <CenteredLoadingContainer height="50vh" size={75} hasText text="user" />}
      {!!h.users?.length && h.users.map((u) => (
        <UserInfoCard user={u} team={team(u.TeamId)} {...h} />
      ))}
    </div>
  );
};

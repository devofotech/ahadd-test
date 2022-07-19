import { Grid } from '@material-ui/core';
import Navbar from '@Components/Navbar';
import ProfileCard from './components/ProfileCard';
import ActivityLog from './components/ActivityLog';
import useHook from './hook';
import UserAccess from './components/UserAccess';

export default (props) => {
  const h = useHook();
  const isNotOrgAdminSelf = props.user?.id !== h.user?.id;
  return (
    <div className="mb-5">
      <Navbar to="/user" text="User Management" subtext={h.user?.name} />
      <Grid container direction="row" justifyContent="space-evenly" spacing={3}>
        <Grid item xs={12} md={isNotOrgAdminSelf ? 4 : 6} xl={isNotOrgAdminSelf ? 3 : 5}>
          <ProfileCard {...h} isNotSelf={isNotOrgAdminSelf} />
        </Grid>
        {isNotOrgAdminSelf && (
          <Grid item container xs={12} md={4} xl={5}>
            <UserAccess {...h} />
          </Grid>
        )}
        <Grid item container xs={12} md={isNotOrgAdminSelf ? 4 : 6} xl={isNotOrgAdminSelf ? 4 : 7}>
          <ActivityLog {...h} isNotSelf={isNotOrgAdminSelf} />
        </Grid>
      </Grid>
    </div>
  );
};

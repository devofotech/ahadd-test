/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@material-ui/core';
import TopBar from '@Components/TopBar';
import AuthPage from '@Pages/Auth';
import Logout from '@Components/Logout';
import SignUp from '@Pages/Auth/SignUp';
import ProjectSite from '@Pages/ProjectSite';
import Dashboard from '@Pages/Dashboard';
import { AuthProvider, AuthContext } from '@Context/Auth';
import AssetListAhadd from '@Pages/AssetListAhadd';
import PrivacyPolicy from '@Pages/PrivacyPolicy';
import ExternalMap from '@Pages/ExternalMap';
import DeniedPage from '@Pages/DeniedPage';
import PendingInformation from '@Pages/PendingInformation';
import './App.css';
import AboutUs from '@Pages/AboutUs';
import InspectionAhadd from '@Pages/InspectionAhadd';
import CreateAssetAhadd from '@Pages/CreateAssetAhadd';
import Analytics from '@Pages/Analytics';
import EditAsset from '@Pages/EditAsset'
import Hook from './hook';

const HomePage = (h) => {
  if (h.user === 'logged out') {
    return <Redirect to="/login" />;
  }
  return <Redirect to="/project" />;
};

export default function App() {
  const h = Hook();
  console.log('hook', h);
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <AuthPage {...h} />
          </Route>
          <Route exact path="/reset-password">
            <AuthPage {...h} />
          </Route>
          <Route exact path="/logout">
            <Logout {...h} />
          </Route>
          <Route exact path="/sign-up">
            <SignUp {...h} />
          </Route>
          <Route exact path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/denied">
            <DeniedPage />
          </Route>
          <Route exact path="/external/view-map/:AssetId">
            <ExternalMap />
          </Route>
          <PrivateRoute exact path="/">
            <HomePage {...h} />
          </PrivateRoute>
          <PrivateRoute exact path="/pending-information">
            <PendingInformation {...h} />
          </PrivateRoute>
          <PrivateRoute path="/project">
            <MainContainer
              user={h.user}
              child={(
                <ProjectSite
                  {...h}
                  setIsMap={h.setIsMap}
                />
              )}
              isProjectSite={h.isMap}
            />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/analytic" user={h.user} accessible={!!h.user?.can_view_dashboard}>
            <MainContainer user={h.user} child={<Dashboard {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/analytics" user={h.user}>
            <MainContainer user={h.user} child={<Analytics {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/asset/" user={h.user}>
            <MainContainer user={h.user} child={<AssetListAhadd {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/create-asset" user={h.user}>
            <MainContainer user={h.user} child={<CreateAssetAhadd {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/edit-asset/:AssetId" user={h.user}>
            <MainContainer user={h.user} child={<EditAsset {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/inspection/:inspection_session" user={h.user} accessible={[2, 3].includes(h.user?.RoleId)}>
            <MainContainer
              user={h.user}
              child={<InspectionAhadd {...h} />}
              adjustedStyle={{ paddingLeft: '2%', paddingRight: '0%' }}
            />
          </PrivateRoute>
          <PrivateRoute exact path="/about-us" user={h.user}>
            <MainContainer user={h.user} child={<AboutUs {...h} />} isFullPage />
          </PrivateRoute>
          <UndeclareRoute />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function MainContainer({
  user, child, adjustedStyle, isProjectSite = false, isFullPage = false,
}) {
  return (
    <Grid
      className={`${!isFullPage && 'content'}`}
      style={{
        position: 'fixed',
        paddingTop: isProjectSite && '70px',
        top: isProjectSite ? '0px' : '50px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        overflow: 'auto',
        ...adjustedStyle,
      }}
    >
      <TopBar
        {...user}
        isProjectSite={isProjectSite}
      />
      <Grid item xs={12}>
        {child}
      </Grid>
      {/* {process.env.REACT_APP_TAWK_TO_ENABLED === 'true' && <TawktoWidget user={user} />} */}
    </Grid>
  );
}

function PrivateRoute({ children, accessible = true, ...rest }) {
  const Auth = useContext(AuthContext);
  if (!accessible && !!rest.user) return <Redirect to="/" />;
  return (
    <Route
      {...rest}
      render={({ location }) => (Auth.token ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

function UndeclareRoute() {
  return (
    <Route path="*" render={() => (<Redirect to={{ pathname: '/project' }} />)} />
  );
}

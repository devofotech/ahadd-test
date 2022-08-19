/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useTour } from '@reactour/tour';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@material-ui/core';
import TopBar from '@Components/TopBar';
import AuthPage from '@Pages/Auth';
import Logout from '@Components/Logout';
import SignUp from '@Pages/Auth/SignUp';
import ProjectSite from '@Pages/ProjectSite';
import Dashboard from '@Pages/Dashboard';
import InspectionJland from '@Pages/Inspection';
import AdminMappingProcessing from '@Pages/AdminMappingProcessing';
import MappingList from '@Pages/MappingList';
import NewProcessing from '@Pages/NewProcessing';
import { AuthProvider, AuthContext } from '@Context/Auth';
import DataMining from '@Pages/DataMining';
import AssetList from '@Pages/AssetList';
import PrivacyPolicy from '@Pages/PrivacyPolicy';
import ExternalMap from '@Pages/ExternalMap';
import UserManagement from '@Pages/UserManagement';
import UserProfile from '@Pages/UserProfile';
import PurchaseToken from '@Pages/PurchaseToken';
import AssetUpload2D from '@Pages/AssetUpload2D';
import AssetUpload3D from '@Pages/AssetUpload3D';
import AssetProfilePage from '@Pages/AssetProfilePage';
import CreateAsset from '@Pages/CreateAsset';
import StoragePlan from '@Pages/StoragePlan';
import StorageAnalysis from '@Pages/StorageAnalysis';
import SeverityLevel from '@Pages/SeverityLevel';
import TransactionOverview from '@Pages/TransactionOverview';
import ProfilePage from '@Pages/ProfilePage';
import DeniedPage from '@Pages/DeniedPage';
import PendingInformation from '@Pages/PendingInformation';
import StorageMonitoring from '@Pages/StorageMonitoring';
import AssetFileList from '@Pages/AssetFileList';
import './App.css';
import AssetUploadReport from '@Pages/AssetUploadReport';
import IssueStatusLevel from '@Pages/IssueStatusLevel';
import MapAnnotation from '@Pages/MapAnnotation';
import AnalysisManagement from '@Pages/AnalysisManagement';
import WorkflowDetails from '@Pages/WorkflowDetails';
import ModuleManagement from '@Pages/ModuleManagement';
import ModuleDetails from '@Pages/ModuleDetails';
import CreateModule from '@Pages/ModuleDetails/CreateModule';
import TawktoWidget from '@Components/TawktoWidget';
import OrganizationSummary from '@Pages/OrganizationSummary';
import OrganizationSummaryDetails from '@Pages/OrganizationSummaryDetails';
import UnsubscribePlan from '@Pages/UnsubscribePlan';
import AssetFileConversion from '@Pages/AssetFileConversion';
import AboutUs from '@Pages/AboutUs';
import CreateAssetAhadd from '@Pages/CreateAssetAhadd';
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
  const { setIsOpen, setCurrentStep, setDisabledActions } = useTour();
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
                  setIsOpen={setIsOpen}
                  setDisabledActions={setDisabledActions}
                  setCurrentStep={setCurrentStep}
                />
              )}
              isProjectSite={h.isMap}
            />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/analytic" user={h.user} accessible={!!h.user?.can_view_dashboard}>
            <MainContainer user={h.user} child={<Dashboard {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/asset/" user={h.user}>
            <MainContainer user={h.user} child={<AssetList {...h} closeTour={() => setIsOpen(false)} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/create-asset" user={h.user}>
            <MainContainer user={h.user} child={<CreateAssetAhadd {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/asset/:AssetId/2D" user={h.user} accessible={!!h.user?.can_view_asset}>
            <MainContainer user={h.user} child={<AssetUpload2D {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/asset/:AssetId/3D" user={h.user} accessible={!!h.user?.can_view_asset}>
            <MainContainer user={h.user} child={<AssetUpload3D {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/asset/:AssetId/report" user={h.user} accessible={!!h.user?.can_view_asset}>
            <MainContainer user={h.user} child={<AssetUploadReport {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/asset/:AssetId" user={h.user} accessible={!!h.user?.can_view_asset}>
            <MainContainer user={h.user} child={<AssetProfilePage {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/severity-level" user={h.user} accessible={!!h.user?.can_edit_severity_level}>
            <MainContainer user={h.user} child={<SeverityLevel {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/issue-status-level" user={h.user} accessible={!!h.user?.can_edit_issue_status}>
            <MainContainer user={h.user} child={<IssueStatusLevel {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/mapping-list" user={h.user} accessible={!!h.user?.can_view_mapping_list}>
            <MainContainer user={h.user} child={<MappingList {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/mapping-list/processing" user={h.user} accessible={!!h.user?.can_add_raw_file}>
            <MainContainer user={h.user} child={<NewProcessing {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/mapping-processing" user={h.user} accessible={['processing'].includes(h.user?.raise_role)}>
            <MainContainer user={h.user} child={<AdminMappingProcessing {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/data-mining" user={h.user} accessible={!!h.user?.can_view_data_mining}>
            <MainContainer user={h.user} child={<DataMining {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/transaction-overview" user={h.user} accessible={!!h.user?.can_view_transaction_history}>
            <MainContainer user={h.user} child={<TransactionOverview {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/storage-analysis" user={h.user} accessible={!!h.user?.can_view_storage_analysis}>
            <MainContainer user={h.user} child={<StorageAnalysis {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/storage-plan" user={h.user} accessible={!!h.user?.can_view_storage_plan}>
            <MainContainer user={h.user} child={<StoragePlan {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/purchase-token" user={h.user} accessible={!!h.user?.can_view_purchase_token}>
            <MainContainer user={h.user} child={<PurchaseToken {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/unsubscribe-plan" user={h.user} accessible={!!h.user?.can_view_storage_plan}>
            <MainContainer user={h.user} child={<UnsubscribePlan {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/inspection/:inspection_session" user={h.user} accessible={[2, 3].includes(h.user?.RoleId)}>
            <MainContainer
              user={h.user}
              child={<InspectionJland {...h} />}
              adjustedStyle={{ paddingLeft: '2%', paddingRight: '0%' }}
            />
          </PrivateRoute>
          <PrivateRoute path="/analysis-management" user={h.user} accessible={[2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<AnalysisManagement {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/workflow/:workflow_id" user={h.user} accessible={[2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<WorkflowDetails {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/module-management" user={h.user} accessible={[2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<ModuleManagement {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/module-management/new" user={h.user} accessible={[2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<CreateModule {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/module-management/:id" user={h.user} accessible={[2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<ModuleDetails {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/map-annotate/:inspection_session" user={h.user} accessible={[2, 3].includes(h.user?.RoleId)}>
            <MainContainer
              user={h.user}
              child={<MapAnnotation {...h} />}
              adjustedStyle={{ paddingLeft: '2%', paddingRight: '0%' }}
            />
          </PrivateRoute>
          <PrivateRoute path="/profile-page">
            <MainContainer user={h.user} child={<ProfilePage {...h} />} />
          </PrivateRoute>
          <PrivateRoute path="/storage-monitoring" user={h.user} accessible={!!h.user?.can_view_storage_monitoring}>
            <MainContainer user={h.user} child={<StorageMonitoring {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/asset-file-list" user={h.user} accessible={[1, 2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<AssetFileList {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/asset-file-list/:asset_id" user={h.user} accessible={[1, 2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<AssetFileList {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/user" user={h.user} accessible={[1, 2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<UserManagement {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/user/:user_id" user={h.user} accessible={[1, 2].includes(h.user?.RoleId)}>
            <MainContainer user={h.user} child={<UserProfile {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/organization-summary" user={h.user} accessible={['monitoring'].includes(h.user?.raise_role)}>
            <MainContainer user={h.user} child={<OrganizationSummary {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/organization-summary/:id" user={h.user} accessible={['monitoring'].includes(h.user?.raise_role)}>
            <MainContainer user={h.user} child={<OrganizationSummaryDetails {...h} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/assetfile-conversion" user={h.user} accessible={['processing'].includes(h.user?.raise_role)}>
            <MainContainer user={h.user} child={<AssetFileConversion {...h} />} />
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
  const {
    setIsOpen, setDisabledActions, setCurrentStep, currentStep, disabledActions,
  } = useTour();
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
        setIsOpen={setIsOpen}
        setDisabledActions={setDisabledActions}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        disabledActions={disabledActions}
      />
      <Grid item xs={12}>
        {child}
      </Grid>
      {process.env.REACT_APP_TAWK_TO_ENABLED === 'true' && <TawktoWidget user={user} />}
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

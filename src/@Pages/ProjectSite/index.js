/* eslint-disable complexity */
import React from 'react';
import {
  Switch, Route, useLocation, Redirect,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Map from '@Components/MapV2';
import _ from 'lodash';

import InspectionSession from '@Pages/InspectionSession';
import InspectionSessionAhadd from '@Pages/InspectionSessionAhadd';
import Mapping from '@Pages/Mapping';
import Report from '@Pages/Report';
import CCTV from '@Pages/CCTV';
import IFrame from '@Pages/IFrame';
import IFrameList from '@Pages/IFrameList';
import CenteredLoading from '@Components/CenteredLoading';
import AssetDemoButton from './components/AssetDemo';
import InfoDialog from './components/InfoDialog';

import Sidebar from './Sidebar';
import SidebarV2 from './SidebarV2';
import Hook from './hook';
import WelcomePage from './components/WelcomePage';

export default function Property(props) {
  const location = useLocation();
  // if (!!props.user && ['name', 'email'].map(attr => !!props.user[attr]).includes(false)) {
  //   if (props.user.RoleId > 1 && !!props.user.OrganizationId) return <Redirect to="/pending-information" />;
  // }
  const prefixLocation = location.pathname.split('/');
  const isAssetView = prefixLocation.length > 4 && prefixLocation[2] === 'asset';

  const h = Hook(props);
  return (
    <>
      {h.isLoadingMap && (
        <div
          className="position-absolute"
          style={{
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(0.75px)',
          }}
        >
          <div className="h-100 w-100 d-flex flex-column justify-content-center">
            <CenteredLoading size={75} hasText text="assets" fontSize="24px" />
          </div>
        </div>
      )}
      <Grid container className="position-relative">
        {!!h.openInfoDialog && <InfoDialog {...h} />}
        {!!props.user?.is_show_intro && <WelcomePage {...h} />}
        {(!!!isAssetView && !!h.projects.length && !_.isEmpty(h.project)) && (
          {
            galaxy: <Sidebar {...h} parentProps={props} />,
            supervision: <Sidebar {...h} parentProps={props} />,
            ahadd: <SidebarV2 {...h} parentProps={props} />,
          }[process.env.REACT_APP_BRANCH]
        )}
        {(!!!isAssetView && !h.isLoadingMap && _.isEmpty(h.project)) && (
          <div onClick={() => { props.setCurrentStep(0); props.setIsOpen(false); }}>
            <AssetDemoButton {...h} tourId="demo_asset" />
          </div>
        )}
        <div data-tut="control-layer" style={{ position: 'fixed', top: '80px', right: '10px', width: '45px', height: '45px', zIndex: -1}}>&nbsp;&nbsp;</div>
        <Grid item xs={12} md={9} className="main d-flex">
          <Switch>
            {[
              {
                path: '/project',
                exact: true,
                render: () => { props.setIsMap(true); return (<Map {...h} />); },
              },
              {
                path: '/project/inspection',
                children: (
                  {
                    galaxy: <InspectionSession {...h} user={props.user} assetTypeList={h.assetTypeList} />,
                    supervision: <InspectionSession {...h} user={props.user} assetTypeList={h.assetTypeList} />,
                    ahadd: <InspectionSessionAhadd {...h} user={props.user} assetTypeList={h.assetTypeList} />,
                  }[process.env.REACT_APP_BRANCH]
                ),
              },
              {
                path: '/project/report',
                children: <Report {...h} user={props.user} />,
              },
              {
                path: '/project/mapping',
                children: <Mapping {...h} />,
              },
              {
                path: '/project/cctv',
                children: <CCTV {...h} />,
              },
              {
                path: '/project/asset/3d/:id',
                children: <IFrame type="3d" {...h} />,
              },
              {
                path: '/project/asset/360/:id',
                children: <IFrame type="threeSixty" {...h} />,
              },
              {
                path: '/project/asset/3d',
                children: <IFrameList type="3d" {...h} user={props.user} />,
              },
              {
                path: '/project/asset/360',
                children: <IFrameList type="threeSixty" {...h} user={props.user} />,
              },
            ].map(e => (
              <Route {...e} />
            ))}
          </Switch>
        </Grid>
      </Grid>
    </>
  );
}

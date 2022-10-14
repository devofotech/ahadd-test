/* eslint-disable complexity */
import React from 'react';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Map from '@Components/MapV2';
import _ from 'lodash';

import InspectionSession from '@Pages/InspectionSession';
import Report from '@Pages/Report';
import CCTV from '@Pages/CCTV';
import IFrame from '@Pages/IFrame';
import IFrameList from '@Pages/IFrameList';
import CenteredLoading from '@Components/CenteredLoading/v2';
import InfoDialog from './components/InfoDialog';

import Hook from './hook';
import WelcomePage from './components/WelcomePage';
import Sidebar from './Sidebar';

export default function Property(props) {
  const location = useLocation();
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
        {(!!!isAssetView && !!h.projects.length && !_.isEmpty(h.project)) && <Sidebar {...h} parentProps={props} />}
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
                children: <InspectionSession {...h} user={props.user} assetTypeList={h.assetTypeList} />,
              },
              {
                path: '/project/report',
                children: <Report {...h} user={props.user} />,
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

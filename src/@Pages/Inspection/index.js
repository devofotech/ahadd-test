/* eslint-disable complexity */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Navbar from '@Components/Navbar';
import Map from '@Components/MapV2';
import CustomToggleButton from '@Components/CustomToggleButton';
import './mapcustomdraw.css';
import CenteredLoadingContainer from '@Components/CenteredLoadingContainer';
import Hook from './hook';
import SideBar from './SideBar';
import ActionBar from './ActionBar';
import MainWorkspace from './MainWorkspace';
import VideoActionBar from './VideoActionBar';
import OverallCondition from './OverallCondition';
import GenerateReport from './GenerateReport';

export default function Inspection(props) {
  const { inspection_session } = useParams();
  const h = Hook({ ...props, InspectionId: inspection_session });
  const isDeveloper = props.user?.raise_role === 'developer';
  const showImageActionBar = h.tab === 0 && !!Object.keys(h.mainImage).length;
  const showVideoActionBar = h.tab === 1 && !!Object.keys(h.mainVideo).length;
  return (
    <>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <Navbar
          to={false}
          text="INSPECTION"
          subtext={h.inspections?.length ? h.inspections[0]['Inspection.name'] : ''}
        />
        <div className="d-flex justify-content-end align-items-center mr-4" style={{ gap: 20 }}>
          <CustomToggleButton {...h} />
          <OverallCondition {...h} />
          <GenerateReport {...h} />
        </div>
      </div>
      <Grid container item xs={12} spacing={2}>
        {showImageActionBar && (
          <Grid item md={12} lg={3}>
            {!!Object.keys(h.mainImage).length && <ActionBar {...h} isDeveloper={isDeveloper} />}
          </Grid>
        )}
        {showVideoActionBar && (
          <Grid item md={12} lg={3}>
            {!!Object.keys(h.mainVideo).length && <VideoActionBar {...h} isDeveloper={isDeveloper} />}
          </Grid>
        )}
        <Grid item xs={12} lg={showImageActionBar || showVideoActionBar ? 9 : 12} className="mapgrid">
          {h.isLoadingInitial ? <CenteredLoadingContainer height="50vh" size={75} hasText text="inspection" /> : (
            <>
              {h.inspectionType === 'image' ? <MainWorkspace {...h} />
                : (
                  <Map
                    filtered_projects={h.images.map(d => ({ ...d, lat: d.lat ?? h.asset_details.lat, lng: d.lng ?? h.asset_details.lng }))}
                    selected_project={h.ImgIdxForMap}
                    set_selected_project={h.setImgIdxForMap}
                    project={h.mainImage}
                    mapStyle={{
                      maxHeight: '60vh', minHeight: '60vh', minWidth: '71vw', maxWidth: '71vw',
                    }}
                    iconType="WithImage"
                    isInspection
                  />
                )}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <SideBar {...h} />
        </Grid>
      </Grid>
    </>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import Navbar from '@Components/Navbar';
import DialogCarousel from '@Components/DialogCarousel';

import { AddOutlined } from '@material-ui/icons';
import Map from '@Components/MapV2';
import Hook from './hook';
import SideBar from './SideBar';
import ActionBar from './ActionBar';
// import MainWorkspace from './MainWorkspace';
import './mapcustomdraw.css';

export default function MapAnnotation(props) {
  const { inspection_session } = useParams();
  const h = Hook({ ...props, InspectionId: inspection_session });
  const isDeveloper = props.user?.raise_role === 'developer';
  const showActionBar = h.tab === 0 && !!Object.keys(h.mainImage).length;
  return (
    <>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <Navbar
          to="/project/inspection/"
          text="INSPECTION"
          subtext={h.inspections?.length ? h.inspections[0]['Inspection.name'] : ''}
        />
        <div className="d-flex align-items-center" style={{ marginRight: 20 }}>
          <DialogCarousel title="How to Annotate Image" name="annotate_image" style={{ marginRight: 20, fontSize: 28 }} />
          <Button
            variant="contained"
            style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)' }}
            className="mr-3"
            onClick={h.generateReport}
          >
            <AddOutlined />
            <p className="text-white">Generate Report</p>
          </Button>
        </div>
      </div>
      <Grid container item xs={12} spacing={2}>
        <Grid container item xs={12} lg={showActionBar ? 9 : 12} spacing={2}>
          <Grid item xs={12} className="mapgrid">
            <Map
              filtered_projects={h.images.map(d => ({ ...d, lat: d.lat ?? h.asset_details.lat, lng: d.lng ?? h.asset_details.lng }))}
              project={h.mainImage}
              mapStyle={{
                maxHeight: '60vh', minHeight: '60vh', minWidth: '71vw', maxWidth: '71vw',
              }}
              isDrawAnnotation
              annotationProps={{ ...h }}
            />
          </Grid>
          <Grid item xs={12}>
            <SideBar {...h} />
          </Grid>
        </Grid>
        {showActionBar && (
          <Grid item md={12} lg={3}>
            <ActionBar {...h} isDeveloper={isDeveloper} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

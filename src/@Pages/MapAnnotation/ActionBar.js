/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import {
  Grid, Paper, Typography, makeStyles, Button,
} from '@material-ui/core';
import moment from 'moment';
import HighlightTabs from '@Components/HighlightTabs';
import _ from 'lodash';
import FormAnnotation from './FormAnnotation';

const useStyles = makeStyles(() => ({
  cardHeader: { fontSize: '14px' },
  cardDetail: { fontSize: '10px' },
  saveButton: { color: '#FFFFFF', backgroundColor: 'var(--secondary-color)', fontFamily: 'CeraProRegular' },
}));

export default function ActionBar({ inspection_module, mainImage, mainImageAnnotations, setMainImageAnnotations, mainAnnotationId, saveImage, isDeveloper, severity, user }) {
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  let userCanEditAnnotation = false;
  if (!mainImage['Inspection.InspectionCategoryId']) userCanEditAnnotation = !!user?.can_annotate;
  if (mainImage['Inspection.ProjectPhaseId'] === 1) userCanEditAnnotation = !!user?.can_edit_planning;
  if (mainImage['Inspection.ProjectPhaseId'] === 2) userCanEditAnnotation = !!user?.can_edit_development;
  if (mainImage['Inspection.ProjectPhaseId'] === 3) userCanEditAnnotation = !!user?.can_edit_construction;
  if (mainImage['Inspection.ProjectPhaseId'] === 4) userCanEditAnnotation = !!user?.can_edit_om;
  if (mainImage['Inspection.ProjectPhaseId'] === 5) userCanEditAnnotation = !!user?.can_edit_decommission;
  const MediaHeader = () => (
    <Typography gutterBottom className={classes.cardHeader} style={{ display: 'flex', marginTop: 10 }}>
      <div style={{ flex: 5 }}>
        General Info {isDeveloper && `(${mainImage.id})`} &nbsp;
      </div>
    </Typography>
  );
  return (
    <div className="paper shadow overflow-auto hide-scroll h-100 px-3" style={{ backgroundColor: 'var(--container-color)' }}>
      <MediaHeader />
      <Paper variant="outlined" style={{ padding: 10 }}>
        <Typography gutterBottom className={classes.cardDetail}>
          {/* <strong>Filename:</strong> {mainImage.name} <br /> */}
          <strong>Date:</strong> {moment(mainImage.recordedAt).format('D MMMM YYYY')} <br />
          <strong>Report ID:</strong> {mainImage['Inspection.id']} <br />
          <strong>Report Name:</strong> {mainImage['Inspection.name']} <br />
          {/* <strong>Inspections Category:</strong> &nbsp;
                  {inspectionCategoryOptions.find(({ id }) => id === mainImage['Inspection.InspectionCategoryId'])?.name ?? 'OSH'}
                  <br /> */}
        </Typography>
      </Paper>
      {!!mainImageAnnotations.length && (
        <>
          <HighlightTabs
            items={[{ label: 'Active', value: 0 }, { label: 'All', value: 1 }]}
            tab={tab}
            setTab={setTab}
            customStyle={{ fontSize: '10px', minWidth: '50%', minHeight: '20px' }}
          />
          <br />
          <Grid container spacing={1} style={{ height: '50vh', overflow: 'auto' }}>
            {mainImageAnnotations.map((annotation) => {
              const isselected = !!(mainAnnotationId === annotation.id);
              if (!!!tab && !isselected) return;
              return (
                <FormAnnotation
                  mainImage={mainImage}
                  annotation={annotation}
                  isselected={isselected}
                  setMainImageAnnotations={setMainImageAnnotations}
                  mainImageAnnotations={mainImageAnnotations}
                  isDeveloper={isDeveloper}
                  severity={severity}
                  inspection_module={inspection_module}
                />
              );
            })}
          </Grid>
        </>
      )}
      {userCanEditAnnotation && (
        <div className="d-flex justify-content-end mt-2">
          <Button variant="contained" className={`my-2 + ${classes.saveButton}`} onClick={() => saveImage()}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

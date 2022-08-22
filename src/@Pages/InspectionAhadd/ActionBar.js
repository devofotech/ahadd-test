/* eslint-disable complexity */
import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import FormAnnotation from './FormAnnotation';

const useStyles = makeStyles(() => ({
  cardHeader: { fontSize: '14px' },
  cardDetail: { fontSize: '10px' },
  saveButton: { color: '#FFFFFF', backgroundColor: 'var(--secondary-color)', fontFamily: 'CeraProRegular' },
}));

export default function ActionBar({
  inspection_module, mainImage, mainImageAnnotations, setMainImageAnnotations, mainAnnotationId, saveImage, isDeveloper, severity, user,
}) {
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  let userCanEditAnnotation = false;
  if (!mainImage['Inspection.InspectionCategoryId']) userCanEditAnnotation = !!user?.can_annotate;
  if (mainImage['Inspection.ProjectPhaseId'] === 1) userCanEditAnnotation = !!user?.can_edit_planning;
  if (mainImage['Inspection.ProjectPhaseId'] === 2) userCanEditAnnotation = !!user?.can_edit_development;
  if (mainImage['Inspection.ProjectPhaseId'] === 3) userCanEditAnnotation = !!user?.can_edit_construction;
  if (mainImage['Inspection.ProjectPhaseId'] === 4) userCanEditAnnotation = !!user?.can_edit_om;
  if (mainImage['Inspection.ProjectPhaseId'] === 5) userCanEditAnnotation = !!user?.can_edit_decommission;
  return (
    <div className="paper shadow overflow-auto" style={{ backgroundColor: 'var(--container-color)', maxHeight: '60vh', minHeight: '60vh' }}>
      <div>
        <div style={{ backgroundColor: '#022C64', padding: 10 }}>
          <p className="text-white">General Info {isDeveloper && `(${mainImage.id})`}</p>
        </div>
        <div className="px-4 py-2">
          <p style={{ color: '#022C64' }}>DJI 9020.jpg</p>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Date:</p>
            <p>{moment().format('D MMMM YYYY')}</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Time:</p>
            <p>{moment().format('hh:mm A')}</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Coordinate:</p>
            <p>101.12314, 1.01233</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Height:</p>
            <p>14.5m</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Cycle:</p>
            <p style={{ fontSize: 16 }}>Cycle 2</p>
          </div>
        </div>
      </div>
      <div>
        <div style={{ backgroundColor: '#022C64', padding: 10 }}>
          <p className="text-white">Defects Rating (AI)</p>
        </div>
        <div className="px-4 py-2">
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Detection:</p>
            <p style={{ fontSize: 16 }}>Gully Erosion</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-light">Severity:</p>
            <p style={{ fontSize: 18, color: '#FEB019' }}>4</p>
          </div>
          <div className="d-flex justify-content-center" style={{ fontSize: 14 }}>
            <Button className="color-gradient-inline" style={{ borderRadius: 18 }}>
              <p className="text-white">VIEW AT MAIN IMAGE</p>
            </Button>
          </div>
        </div>
      </div>
      {mainImageAnnotations.map((annotation) => {
        const isselected = !!(mainAnnotationId === annotation.id);
        if (!!!tab && !isselected) return;
        return (
          <FormAnnotation
            annotation={annotation}
            setMainImageAnnotations={setMainImageAnnotations}
            mainImageAnnotations={mainImageAnnotations}
          />
        );
      })}
      {!!!tab && userCanEditAnnotation && (
        <div className="d-flex justify-content-end my-2 pr-3">
          <Button variant="contained" className={`my-2 color-gradient-inline ${classes.saveButton}`} onClick={() => saveImage()}>
            SAVE
          </Button>
        </div>
      )}
    </div>
  );
}

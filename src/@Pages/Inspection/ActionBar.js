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
  inspection_module, mainImage, mainImageAnnotations, setMainImageAnnotations, mainAnnotationId, saveImage, isDeveloper, severity, user, mainSetImage, handleChangeMainImage, setOpenPinLocationDialog,
}) {
  const classes = useStyles();
  return (
    <div className="paper shadow overflow-auto" style={{ backgroundColor: 'var(--container-color)', maxHeight: '60vh', minHeight: '60vh' }}>
      <div>
        <div style={{ backgroundColor: '#022C64', padding: 10 }}>
          <p className="text-white">General Info {isDeveloper && `(${mainImage.id})`}</p>
        </div>
        <div className="px-4 py-2">
          <p style={{ color: '#022C64' }}>DJI 9020.jpg</p>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-secondary">Date:</p>
            <p>{moment(mainImage.createdAt).format('D MMMM YYYY')}</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-secondary">Time:</p>
            <p>{moment(mainImage.createdAt).format('hh:mm A')}</p>
          </div>
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-secondary">Coordinate:</p>
            <p>{(mainImage.lat && mainImage.lng) ? `${mainImage.lat}, ${mainImage.lng}` : 'N/A'}</p>
          </div>
          {/* <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-secondary">Height:</p>
            <p>14.5m</p>
          </div> */}
          <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
            <p className="text-secondary">Cycle:</p>
            <p style={{ fontSize: 16 }}>Cycle {mainImage['Inspection.cycle']}, {mainImage['Inspection.year']}</p>
          </div>
        </div>
      </div>
      {!mainImage.is_main && (
        <>
          <div>
            <div style={{ backgroundColor: '#022C64', padding: 10 }}>
              <p className="text-white">Defects Rating (AI)</p>
            </div>
            <div className="px-4 py-2">
              <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                <p className="text-secondary">Detection:</p>
                <p style={{ fontSize: 16 }}>No Record</p>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
                <p className="text-secondary">Severity:</p>
                <p style={{ fontSize: 18, color: '#FEB019' }}>No Record</p>
              </div>
              <div className="d-flex justify-content-center" style={{ fontSize: 14 }}>
                {!!mainImage.pin_on_main ? (
                  <Button className="color-gradient-inline" style={{ borderRadius: 18 }} onClick={() => handleChangeMainImage(mainSetImage.id)}>
                    <p className="text-white">VIEW AT MAIN IMAGE</p>
                  </Button>
                ) : (
                  <Button style={{ borderRadius: 18, backgroundColor: 'red' }} onClick={() => setOpenPinLocationDialog(true)}>
                    <p className="text-white">SET LOCATION ON MAIN IMAGE</p>
                  </Button>
                )}
              </div>
            </div>
          </div>
          {mainImageAnnotations.map((annotation) => {
            const isselected = !!(mainAnnotationId === annotation.id);
            if (!isselected) return;
            return (
              <>
                <FormAnnotation
                  annotation={annotation}
                  setMainImageAnnotations={setMainImageAnnotations}
                  mainImageAnnotations={mainImageAnnotations}
                />
              </>
            );
          })}
          {!mainImage.is_main && (
            <div className="d-flex justify-content-end my-2 pr-3">
              <Button variant="contained" className={`my-2 color-gradient-inline ${classes.saveButton}`} onClick={() => saveImage()}>
                SAVE
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

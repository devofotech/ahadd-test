import React, { useState, useEffect } from 'react';
import useUrlQueries from '@Helpers/urlQueries';
import {
  Grid, TextField, FormGroup, Checkbox, FormControlLabel,
} from '@material-ui/core';
import Api, { endpoints } from '@Helpers/api';
import Button from './Button';
import Dropzone from './Dropzone';
import PaymentDialog from './PaymentDialog';
import AfterPaymentDialog from './AfterPaymentDialog';

export default function CloudProcessing({ project }) {
  const { url_queries } = useUrlQueries();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAfter, setOpenDialogAfter] = useState(false);
  const [intents, setIntents] = useState();

  const [files, setFiles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const [imageryname, setImageryname] = useState();
  const [imagerytype, setImagerytype] = useState({ twoD: false, threeD: false });
  const { twoD, threeD } = imagerytype;
  const handleImageryDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleImageryNameChange = (event) => {
    setImageryname(event.target.value);
  };
  const handleImageryTypeChange = (event) => {
    setImagerytype({ ...imagerytype, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    if (url_queries.payment_processed) {
      Api({
        endpoint: endpoints.getPayment(url_queries.payment_intent),
        onSuccess: ({ paymentIntent }) => {
          setIntents(paymentIntent);
          setOpenDialogAfter(true);
        },
        onFail: (response) => console.log('lol'),
      });
    }
  }, []);
  console.log('vvv', files);
  return (
    <Grid container>
      <AfterPaymentDialog intents={intents} open={openDialogAfter} setOpen={setOpenDialogAfter} />
      <PaymentDialog open={openDialog} setOpen={setOpenDialog} />
      <Grid container item xs={12} spacing={3}>
        <Grid item md={12} lg={7}>
          <Dropzone files={files} setFiles={setFiles} />
        </Grid>
        <Grid container item md={12} lg={5} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item md={12} lg={12} style={{ flex: 1 }}>
            <p>Total Images to Upload: {files.length}</p>
          </Grid>
          <Grid container item md={12} lg={12} style={{ flex: 2 }}>
            <Grid item md={12} lg={6}>
              <p>Date Progress</p>
              <TextField
                type="date"
                variant="outlined"
                size="small"
                defaultValue="2017-05-24"
                style={{ width: '100%' }}
                value={selectedDate}
                onChange={handleImageryDateChange}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <p>Imagery Name</p>
              <TextField
                id="outlined-size-small"
                placeholder="Project An Imagery"
                variant="outlined"
                size="small"
                value={imageryname}
                onChange={handleImageryNameChange}
              />
            </Grid>
          </Grid>
          <Grid container item md={12} lg={12} style={{ flex: 3 }}>
            <Grid item md={12} lg={6}>
              <p>Output</p>
              <FormGroup>
                {[
                  { checked: twoD, name: 'twoD', label: '2D MAP' },
                  { checked: threeD, name: 'threeD', label: '3D' },
                ].map((e) => (
                  <FormControlLabel
                    control={<Checkbox {...e} onChange={handleImageryTypeChange} />}
                    label={e.label}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item md={12} lg={12} style={{ flex: 1 }}>
            <p>Processing Fee: RM 4,321</p>
          </Grid>
          <Grid item md={12} lg={12} style={{ flex: 1 }}>
            <Button
              variant="contained"
              onClick={() => setOpenDialog({
                imageryname,
                imagerytype,
                total_count: files.length,
                files,
                project,
              })}
              style={{
                margin: '15px 0px',
                padding: '4px 20px',
                opacity: files.length > 0 ? 1 : 0,
              }}
              disabled={files.length === 0}
            >
              UPLOAD DATA
            </Button>
          </Grid>
          <div style={{ flex: 6 }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable complexity */
import { useState } from 'react';
import {
  Grid, TextField, CircularProgress,
} from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { primaryColor } from '@Assets/css/index';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Dropzone from '@Components/DropzoneBox';
import Button from '@Components/Button';
import StatusTimeline from './StatusTimeline';

const styles = {
  img: {
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 4,
    marginRight: 4,
    width: 40,
    transform: 'scale(0.8)',
    marginLeft: -5,
  },
  footer: {
    width: '100%',
  },
  wrapper: {
    position: 'relative',
  },

  box: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
};
const img_size = { width: 750, height: 600 };

export default ({
  handleClose, files, setFiles, onUpload = () => null, isLoading, issues, getTeam = () => null, team, currentUser, ...item
}) => {
  const [remark, setRemark] = useState('');
  const [date, setDate] = useState('');
  const [selectedIssueId, setSelectedIssueId] = useState(0);
  const [selectedSequenceId, setSelectedSequenceId] = useState(0);
  const defaultDate = !date ? new Date() : date;
  let subTitle = item.is_compliance ? 'Compliance' : 'Non Compliance';
  if (item['InspectionFile.Inspection.InspectionCategoryId'] === 3) {
    subTitle = `Formwork dimensions - ${item.is_good_practice ? 'Good Practice' : 'Not Allowed'}`;
  }
  const resetInput = () => { setRemark(''); setDate(''); setSelectedIssueId(0); };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div
        className="d-flex"
        style={{
          borderRadius: 5, backgroundColor: 'white', width: '-webkit-fill-available',
        }}
      >
        <div style={styles.wrapper}>
          <img
            src={`${process.env.REACT_APP_ENDPOINT_URL}thumbnail_annotation/${item.id}`}
            loading="lazy"
            style={{ objectFit: 'contain', width: `${img_size.width}px`, height: `${img_size.height}px` }}
          />
        </div>
        <div
          className="position-relative w-100 h-100"
          style={{ textAlign: 'left', padding: 20, marginRight: 20 }}
        >
          <div className="d-flex" style={{ gap: 10 }}>
            <KeyboardArrowLeft
              className="d-flex mt-1"
              style={{
                color: '#FFFFFF',
                fontSize: 28,
                background: primaryColor,
                padding: '5px 1px',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              onClick={handleClose}
            />
            <div className="d-flex flex-column w-100">
              <h5 className="font-weight-bold">{item.title || 'No Title'}</h5>
              <p className="text-light">
                {subTitle} -&nbsp;
                <text className="font-weight-bold" style={{ color: item.color }}>{item.severity_name}</text>
              </p>
              <Grid xs={12} container item>
                {
                  [
                    { label: 'Date', output: moment(item.createdAt).format('D MMM YYYY') },
                    { label: 'Time', output: moment(item.createdAt).format('hh:mm a') },
                    { label: 'Coordinate', output: (!!item.lag && !!item.lng) ? `${item.lat}, ${item.lng}` : 'No coordinate' },
                  ].map(m => (
                    <Grid xs={4} item className="w-100">
                      <p className="text-light" style={{ fontSize: 12 }}>
                        {m.label} <br />
                        <text className="text-primary font-weight-bold" style={{ fontSize: 14 }}>{m.output}</text>
                      </p>
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          </div>

          <div className="px-2 w-100 hide-scroll" style={{ height: '29rem', overflowY: 'scroll' }}>
            {isLoading ? (
              <CircularProgress
                size={75}
                className="position-absolute"
                style={{
                  top: '130%', left: '50%', marginTop: 0, marginLeft: -40, color: 'var(--primary-color)', transform: 'translate(50%, 0)',
                }}
              />
            ) : (
              <>
                <StatusTimeline
                  issues={issues}
                  selectedIssueId={selectedIssueId}
                  setSelectedIssueId={setSelectedIssueId}
                  setSelectedSequenceId={setSelectedSequenceId}
                  currentUser={currentUser}
                  team={team}
                  getTeam={getTeam}
                  {...item}
                />
                {!item.is_close && (
                  <div>
                    <p className="py-1" style={{ color: 'grey', fontSize: 14 }}>Remark</p>
                    <TextField
                      multiline
                      maxRows={3}
                      rows={3}
                      placeholder="Leave a remark here"
                      variant="outlined"
                      size="small"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="w-100 mb-2"
                    />
                    {![4, 0].includes(selectedSequenceId) && (
                      <>
                        <p className="py-1" style={{ color: 'grey', fontSize: 14 }}>Expected due date</p>
                        <KeyboardDatePicker
                          autoOk
                          className="w-100 mb-2"
                          size="small"
                          variant="inline"
                          inputVariant="outlined"
                          format="DD/MM/yyyy"
                          minDate={new Date()}
                          value={defaultDate}
                          InputAdornmentProps={{ position: 'end' }}
                          onChange={e => setDate(e)}
                        />
                      </>
                    )}
                    <p className="py-1" style={{ color: 'grey', fontSize: 14 }}>Supporting Document(s)</p>
                    <Dropzone type="docImg" files={files} setFiles={setFiles} height="13rem" hasButton={false} />
                    <div className="d-flex mt-2 justify-content-between align-items-center">
                      <p>{files.length}/99</p>
                      <Button
                        disabled={!selectedIssueId}
                        onClick={() => onUpload(item.id, { remark, date, selectedIssueId }, resetInput)}
                      >
                        Upload Document
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

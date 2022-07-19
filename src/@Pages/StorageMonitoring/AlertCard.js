import { truncateString } from '@Helpers';
import { Divider, Grid, Tooltip } from '@material-ui/core';
import { Delete, NotificationsActive } from '@material-ui/icons';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AlertDialog from './AlertDialog';

export default (h) => {
  const MySwal = withReactContent(Swal);
  const colorCard = h.done ? '#A4A4A4' : '#FEB019';
  return (
    <Grid item xs={12} md={6} xl={4}>
      <div className="position-relative d-flex align-items-center mr-4 mb-4">
        <Grid xs={1} />
        <Grid container xs={11} className="position-relative shadow p-2 d-flex justify-content-around">
          <Icon {...h} colorCard={colorCard} />
          <Grid item className="d-flex align-items-center">
            <h1 className="ml-1 pl-2" style={{ fontSize: 35, fontWeight: 'bold', color: colorCard }}>{h.mark?.toFixed(0)}%</h1>
          </Grid>
          <Grid item><Divider orientation="vertical" /></Grid>
          <Grid container item direction="column" xs={6}>
            <h6 style={{ color: colorCard }} className="ml-1 mt-1">{h.done ? 'No Longer Needed' : h?.name}</h6>
            <Tooltip title={h.description?.length < 24 ? '' : h.description}>
              <p style={{ fontSize: 12 }} className="ml-1">
                Description: {truncateString(h.description, 23)}
              </p>
            </Tooltip>
            <p style={{ fontSize: 12 }} className="ml-1">Date Created: {!!h.createdAt ? moment(h.createdAt).format('DD MMM YYYY') : '-'}</p>
            <p style={{ fontSize: 12 }} className="ml-1">
              Alert Triggered: {!!h.triggeredAt ? moment(h.triggeredAt).format('DD MMM YYYY') : '-'}
            </p>
          </Grid>
          <Grid container item direction="column" xs={1} className="justify-content-around align-items-end">
            {!h.done && <AlertDialog edit {...h} />}
            {!h.cannotDelete
              && (
                <Delete
                  style={{ color: '#045C5C', fontSize: 20 }}
                  className="mb-1 pointer"
                  onClick={() => {
                    MySwal.fire({
                      icon: 'question',
                      title: 'Are you sure you want to delete this alert?',
                      text: `Name: ${h?.name}`,
                      showCancelButton: true,
                      showDenyButton: true,
                      showConfirmButton: false,
                      denyButtonText: 'Delete this alert',
                      cancelButtonText: 'Do Nothing',
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isDenied) h.deleteStorageAlert(h.id);
                    });
                  }}
                />
              )}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

const Icon = (h) => {
  return (
    <div
      className="position-absolute flex-standard float-left"
      style={{
        left: -20, top: 25, width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${h.colorCard}`,
      }}
    >
      <div
        className="flex-standard"
        style={{
          backgroundColor: h.colorCard, color: 'white', width: '34px', height: '34px', borderRadius: '50%',
        }}
      >
        <NotificationsActive fontSize="small" style={{ color: h.done && '#000' }} />
      </div>
    </div>
  );
};

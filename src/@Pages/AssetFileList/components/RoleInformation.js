import Button from '@Components/Button';
import {
  Dialog, DialogContent, DialogActions, DialogTitle, Grid, Checkbox,
} from '@material-ui/core';
import { Done, Remove } from '@material-ui/icons';
import { useState } from 'react';

export default ({
  roleTitle, roleCheckStatus, handleChange, roleStatus,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Role Information</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Information about Role</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid container item xs={12}>
              <Grid item xs={4} />
              <Grid container item xs={8}>
                {['ADMINISTRATOR', 'ASSET MANAGER', 'USER'].map(title => (<Grid item xs={4} className="flex-standard">{title}</Grid>))}
              </Grid>
            </Grid>
            <Grid container item xs={4}>
              {roleTitle.map(title => (
                <Grid item xs={12} className="my-2"><p className="font-weight-bold text-dark">{title}</p></Grid>
              ))}
            </Grid>
            <Grid container item xs={8}>
              {roleCheckStatus.map(status => (
                <Grid item xs={4} className="flex-standard my-2">
                  <CustomCheckbox value={status} onChange={handleChange} roleStatus={roleStatus} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-2"
            onClick={() => setOpen(false)}
            variant="outlined"
            style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
          >
            Close
          </Button>
          {/* <Button disabled>Upload</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

const CustomCheckbox = (props) => (
  <Checkbox
    icon={<Remove style={{ color: 'black' }} />}
    checkedIcon={<Done style={{ color: 'var(--primary-color)' }} />}
    name={props.value}
    checked={props.roleStatus[props.value]}
    disabled
    {...props}
  />
);

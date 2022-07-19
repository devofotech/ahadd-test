/* eslint-disable max-lines */
/* eslint-disable complexity */
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, IconButton, InputAdornment, Slider, TextField, withStyles,
} from '@material-ui/core';
import { AddOutlined, CheckBoxOutlined, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

const useStyles = makeStyles(() => ({
  cancelBtn: { color: 'var(--primary-color)' },
  submitBtn: { backgroundColor: 'var(--primary-color)', color: '#FFFFFF' },
}));

export default (h) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, set_name] = useState(h.name ?? '');
  const [description, set_description] = useState(h.description ?? '');
  const [mark, set_mark] = useState(h.mark ?? 0);
  const [web_support, set_web_support] = useState(h.web_support ?? false);
  const [email_support, set_email_support] = useState(h.email_support ?? false);
  const [sms_support, set_sms_support] = useState(h.sms_support ?? false);

  const resetForm = () => {
    set_name(h.name ?? '');
    set_description(h.description ?? '');
    set_mark(h.mark ?? 0);
    set_web_support(h.web_support ?? false);
    set_email_support(h.email_support ?? false);
    set_sms_support(h.sms_support ?? false);
  };

  useEffect(() => {
    if (!open) return;
    resetForm();
  }, [open]);

  const handleSliderChange = (event, newValue) => set_mark(newValue);
  const handleInputChange = (event) => {
    if (event.target.value < 0) return;
    if (event.target.value > 100) return;
    if (event.target.value % 1 != 0) return;
    set_mark(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (mark < 0) {
      set_mark(0);
    } else if (mark > 100) {
      set_mark(100);
    }
  };
  const handleSubmit = () => {
    const input = {
      name, description, mark, web_support, email_support, sms_support, OrganizationId: h.organizationId,
    };
    if (!input.OrganizationId) return;
    if (!input.name) return;
    if (!input.description) return;
    if (h.create) {
      Api({
        endpoint: endpoints.newStorageAlert(),
        data: { input },
        onSuccess: () => {
          toast('success', 'Storage Alert created');
          resetForm();
          setOpen(false);
          h.refreshStorageAlert(h.organizationId);
        },
        onFail: () => toast('error', 'Error to create Storage Alert. Please try again later.'),
      });
    } else {
      Api({
        endpoint: endpoints.updateStorageAlert(h?.id),
        data: { input },
        onSuccess: () => {
          toast('success', 'Storage Alert updated');
          resetForm();
          setOpen(false);
          h.refreshStorageAlert(h.organizationId);
        },
        onFail: () => toast('error', 'Error to update Storage Alert. Please try again later.'),
      });
    }
  };
  return (
    <>
      {h.edit && <Edit style={{ color: '#045C5C', fontSize: 20 }} className="mb-1 pointer" onClick={() => setOpen(true)} />}
      {h.create && (
        <Button
          size="small"
          variant="contained"
          style={{ color: '#FFFFFF', backgroundColor: 'var(--primary-color)' }}
          className="mx-1"
          onClick={() => setOpen(true)}
        >
          <AddOutlined />Add Alert
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogContent className="hide-scroll">
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <h5 className="color-primary font-weight-bold">Alert Title:</h5>
              <TextField
                variant="outlined"
                placeholder="Please enter the title... e.g: Delete Old Data."
                fullWidth
                size="small"
                className="mt-2"
                value={name}
                onChange={(e) => set_name(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <h5 className="color-primary font-weight-bold">Alert Details:</h5>
              <TextField
                variant="outlined"
                placeholder="When this alert shows up, let's delete unused older data
            and projects. It it's still not enough, suggest to boss for plan upgrade."
                size="small"
                multiline
                fullWidth
                required
                rows={4}
                className="mt-2"
                value={description}
                onChange={(e) => set_description(e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid container item xs={9} spacing={0}>
                <div className="w-100">
                  <h5 className="color-primary font-weight-bold">Alert Triggers:</h5>
                </div>
                <Grid container item>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={mark}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      type="number"
                      style={{ width: '5.3rem' }}
                      InputProps={{
                        inputProps: { min: '0', max: '100', step: '1' },
                        endAdornment: (
                          <InputAdornment className="p-0">
                            <IconButton style={{ width: 0, pointerEvents: 'none', fontSize: 17 }}>
                              %
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      endAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                  </Grid>
                  <Grid item xs={9} className="d-flex justify-content-between pt-2 pl-2">
                    0%&nbsp;&nbsp;
                    <Slider
                      value={typeof mark === 'number' ? mark : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      style={{ color: 'var(--active-color)' }}
                    />
                    &nbsp;&nbsp;100%
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <h5 className="color-primary font-weight-bold mb-1">Notify:</h5>
                <FormCheckBox data={web_support} setData={set_web_support} label="Via Web" />
                <FormCheckBox data={email_support} setData={set_email_support} label="Via Email" />
                <FormCheckBox data={sms_support} setData={set_sms_support} label="Via SMS" />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); resetForm(); }} variant="outlined" className={classes.cancelBtn}>
            Cancel
          </Button>
          <Button variant="contained" className={classes.submitBtn} onClick={handleSubmit}>
            {h.create ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const GreenCheckbox = withStyles({
  root: {
    color: 'var(--active-color)',
    '&$checked': {
      color: 'var(--active-color)',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const FormCheckBox = (h) => {
  return (
    <FormControlLabel
      control={(
        <GreenCheckbox
          checkedIcon={<CheckBoxOutlined style={{ color: 'var(--active-color)' }} />}
          checked={h.data}
          onChange={(e) => h.setData(e.target.checked)}
          className="py-0 px-2"
        />
      )}
      label={h.label}
    />
  );
};

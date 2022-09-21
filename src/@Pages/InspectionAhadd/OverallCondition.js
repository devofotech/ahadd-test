import Button from '@Components/Button';
import {
  Dialog, DialogTitle, DialogActions, makeStyles, DialogContent, IconButton, RadioGroup, FormControlLabel, Radio, TextField, withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

export default ({ inspectionDetail, updateOverallCondition }) => {
  const [open, set_open] = useState(false);
  const [eng_slope_condition, set_eng_slope_condition] = useState(inspectionDetail.eng_slope_condition);
  const [description, set_description] = useState(inspectionDetail.description ?? '');
  const classes = useStyles();

  useEffect(() => {
    if (!!inspectionDetail.description) return;
    set_description({
      1: 'Slope in good condition with not more than one slope element requiring maintenance or minor repair.',
      2: 'Slope in satisfactory condition with not more than one slope element requiring maintenance or minor repair/ repair.',
      3: 'Slope in fair condition with not more than one slope element requiring minor repair/ repair.',
      4: 'Slope in poor condition with more than one slope elements requiring repair or rehabilitation works.',
      5: 'Slope in severe condition with extensive repair or rehabilitation works required to one or more slope elements.',
    }[eng_slope_condition]);
  }, [eng_slope_condition]);

  useEffect(() => {
    set_eng_slope_condition(inspectionDetail.eng_slope_condition);
    set_description(inspectionDetail.description ?? '');
  }, [inspectionDetail]);

  const handleSubmit = () => {
    if (!eng_slope_condition) return;
    updateOverallCondition({ description, eng_slope_condition });
    set_open(false);
  };

  return (
    <>
      <Button className="color-gradient-inline" style={{ borderRadius: 18 }} onClick={() => set_open(true)}>
        <p className="text-white">OVERALL CONDITION</p>
      </Button>
      <Dialog
        open={open}
        onClose={() => set_open(false)}
        PaperProps={{ style: { borderRadius: 10 } }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p style={{ color: '#022C64', fontWeight: 600 }}>Overall Slope Condition</p>
            <IconButton onClick={() => set_open(false)}>
              <Close fontSize="small" />
            </IconButton>
          </div>
          <p style={{ fontSize: '16px', color: '#022C64' }}>AI Slope Condition: <strong>Good</strong></p>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'hidden' }}>
          <div>
            <RadioGroup
              value={String(eng_slope_condition)}
              onChange={(e) => set_eng_slope_condition(e.target.value)}
              style={{ flexDirection: 'row' }}
            >
              {[
                { value: '1', label: 'Very Good' },
                { value: '2', label: 'Good' },
                { value: '3', label: 'Average' },
                { value: '4', label: 'Poor' },
                { value: '5', label: 'Very Poor' },
              ].map((e) => <FormControlLabel value={e.value} control={<GreenRadio />} label={e.label} />)}
            </RadioGroup>
            <TextField
              placeholder="Leave remark here"
              multiline
              rows={6}
              variant="outlined"
              className="w-100 py-2"
              value={description}
              onChange={(e) => set_description(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className={classes.dialogAction}>
            <Button
              className="text-white"
              variant="outlined"
              style={{ border: '1px solid var(--main-color)', borderRadius: 20, backgroundColor: 'white' }}
              onClick={() => set_open(false)}
            >
              <p style={{ color: 'var(--main-color)' }}>CANCEL</p>
            </Button>
            <Button
              className="color-gradient-inline mx-3"
              style={{ borderRadius: 20 }}
              onClick={handleSubmit}
            >
              <p style={{ color: 'white' }}>SAVE</p>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles(() => ({
  blueBtn: { borderRadius: '6px', width: '5rem' },
  blueBtnText: { color: '#FFFFFF', fontWeight: 600, fontSize: 16 },
  outlinedBtnText: { fontWeight: 600, fontSize: 16 },
  closeBtn: { cursor: 'pointer', float: 'right' },
  root: { '&$checked': { color: 'rgb(30, 52, 101)' }, transform: 'scale(0.8)' },
  dialogAction: {
    display: 'flex', justifyContent: 'flex-end', padding: '10px 0', width: '100%',
  },
}));

const GreenRadio = withStyles({
  root: { '&$checked': { color: green[600] } },
  checked: {},
})((props) => <Radio color="default" {...props} />);

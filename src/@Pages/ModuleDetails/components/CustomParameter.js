import {
  Dialog, DialogActions, DialogContent, TextField,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import _ from 'lodash';
import { useState } from 'react';
import Button from '@Components/Button';

export default (h) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [customParams, setCustomParams] = useState('');
  const isDisabled = _.some(h.list, ['label', customParams]);

  const addParams = () => {
    h.createParameter(customParams);
    setOpenCreate(false);
  };

  const openDialog = () => {
    if (h.isCreate) { setOpenWarning(true); return; }
    setOpenCreate(true);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: 'var(--primary-color)',
          border: '1px solid var(--secondary-color)',
          height: '42px',
        }}
        className="px-2 rounded d-flex justify-content-start align-items-center pointer"
        onClick={openDialog}
      >
        <AddOutlined className="mr-2" />
        Add custom parameter
      </div>
      <Dialog open={openWarning} onClose={() => setOpenWarning(false)} fullWidth>
        <DialogContent>
          <h5 className="mb-1">Cannot add parameter</h5>
          <h6>Please create the module first to add parameter. You may add parameter in its module page.</h6>
        </DialogContent>
        <DialogActions>
          <Button className="mr-2" variant="text" onClick={() => setOpenWarning(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth>
        <DialogContent>
          <TextField
            placeholder="Enter custom parameter here"
            variant="outlined"
            fullWidth
            size="small"
            className="py-2"
            onChange={(e) => setCustomParams(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className="mr-2" variant="text" onClick={() => setOpenCreate(false)}>
            Cancel
          </Button>
          <Button onClick={addParams} disabled={isDisabled}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

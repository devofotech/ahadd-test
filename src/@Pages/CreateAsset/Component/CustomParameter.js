import {
  Dialog, DialogActions, DialogContent, TextField,
} from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import _ from 'lodash';
import { useState } from 'react';
import Button from '@Components/Button';
import { uuid } from 'uuidv4';

export default (h) => {
  const [open, setOpen] = useState(false);
  const [customParams, setCustomParams] = useState('');
  const isDisabled = _.some(h.list, ['label', customParams]);

  const addParams = () => {
    if (!customParams) return;
    h.setAssetParameters(pv => [...pv, {
      ModuleId: h.ModuleId,
      name: customParams.replace(/ /g, '_').toLowerCase(),
      label: customParams,
      is_active: true,
      id: uuid(),
    }]);
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: 'var(--primary-color)',
          border: '1px solid var(--secondary-color)',
          height: '42px',
          marginLeft: 4,
          marginRight: -4,
        }}
        className="px-2 rounded d-flex justify-content-start align-items-center pointer"
        onClick={() => setOpen(true)}
      >
        <AddOutlined className="mr-1" />
        Add custom parameter
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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
          <Button className="mr-2" variant="text" onClick={() => setOpen(false)}>
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

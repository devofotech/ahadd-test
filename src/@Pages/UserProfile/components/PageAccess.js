import { useState } from 'react';
import {
  Chip, Grid, IconButton, CircularProgress,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@Components/Button';

const animatedComponents = makeAnimated();

export default ({ pageAccessList, selectedPage, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [pageAccessIds, setPageAccessIds] = useState([]);

  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);

  const onSave = () => {
    closeEdit();
    props.updateUser({ page_access: pageAccessIds.join(',') });
  };

  return (
    <>
      <Grid container justify="space-between">
        <h3>Page Access</h3>
        <IconButton onClick={isEdit ? closeEdit : openEdit}>
          {isEdit ? <Close style={{ color: '#EA0000' }} /> : <Edit className="color-primary" />}
        </IconButton>
      </Grid>
      {props.isLoadingPageAccess && <CircularProgress style={{ color: 'var(--primary-color)' }} />}
      {!isEdit ? (
        <Grid Grid container item xs={12} className="overflow-auto">
          {selectedPage?.length
            ? selectedPage.map(data => <CustomChip label={data.label} />)
            : <CustomChip label="None" />}
        </Grid>
      ) : (
        <Grid container>
          <div className="w-100 mb-3">
            <Select
              placeholder="Page access allowed ..."
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(data) => setPageAccessIds(!data ? '' : data.map(({ value }) => value))}
              defaultValue={selectedPage}
              options={pageAccessList.map(e => ({ label: e.name, value: e.id }))}
              isMulti
            />
          </div>
          <Button className="ml-auto" onClick={onSave} disabled={props.isLoadingSave}>
            {props.isLoadingSave && <CircularProgress size={24} className="mr-2" />}
            Save changes
          </Button>
        </Grid>
      )}
    </>
  );
};

const CustomChip = (data) => {
  return (
    <Chip
      label={data.label}
      size="small"
      className="mr-1 mb-1 text-capitalize text-white"
      style={{
        backgroundColor: 'var(--primary-color)',
      }}
    />
  );
};

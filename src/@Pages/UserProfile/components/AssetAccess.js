import { useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import {
  Chip, Grid, IconButton, CircularProgress,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from '@Components/Button';

const animatedComponents = makeAnimated();

export default ({ assetAccessList, selectedAsset, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [assetAccessIds, setAssetAccessIds] = useState([]);

  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);

  const onSave = () => {
    const data = {
      UserId: props.user.id,
      AssetsId: String(assetAccessIds),
    };

    if (!data.UserId) return;
    props.setIsLoadingAssetAccess(true);
    Api({
      endpoint: endpoints.updateAssetAccess(),
      data,
      onSuccess: () => {
        closeEdit();
        props.getUser();
        toast('success', 'Update user successful');
      },
      onFail: () => { toast('error', 'Failed update user'); },
    });
    props.setIsLoadingAssetAccess(false);
  };

  return (
    <>
      <Grid container justify="space-between">
        <h3 className="mt-3">Asset Access</h3>
        <IconButton onClick={isEdit ? closeEdit : openEdit}>
          {isEdit ? <Close style={{ color: '#EA0000' }} /> : <Edit className="color-primary" />}
        </IconButton>
      </Grid>
      {props.isLoadingAssetAccess && <CircularProgress style={{ color: 'var(--primary-color)' }} />}
      {!isEdit ? (
        <Grid Grid container item xs={12} className="overflow-auto">
          {selectedAsset?.length
            ? selectedAsset.map(data => <CustomChip label={data.label} />)
            : <CustomChip label="None" />}
        </Grid>
      ) : (
        <Grid container>
          <div className="w-100 mb-3">
            <Select
              placeholder="Asset access allowed ..."
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(data) => setAssetAccessIds(!data ? '' : data.map(({ value }) => value))}
              defaultValue={selectedAsset}
              options={assetAccessList.map(e => ({ label: e.name, value: e.id }))}
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

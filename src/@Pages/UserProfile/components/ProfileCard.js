import { useState, useEffect } from 'react';
import {
  Avatar, Typography, TextField, CircularProgress, IconButton,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import Button from '@Components/Button';
import AvatarEdit from './AvatarEdit';

const style = {
  marginRight: -24,
  float: 'right',
};

export default ({ user, updateUser, isLoadingSave, isNotSelf = false }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [image, setImage] = useState([]);

  useEffect(() => {
    resetForm();
  }, [user]);

  const resetForm = () => {
    setName(user?.name);
    setPhone(user?.phone);
  };

  const onSave = () => {
    closeEdit();
    updateUser({ name, phone }, image);
  };

  const openEdit = () => setIsEdit(true);
  const closeEdit = () => { resetForm(); setIsEdit(false); };

  return (
    <div className="bg-white shadow rounded-xl px-4" style={{ height: !isNotSelf ? '41rem' : '100%' }}>
      <IconButton style={style} onClick={isEdit ? closeEdit : openEdit} disabled={isLoadingSave}>
        {isEdit ? <Close style={{ color: '#EA0000' }} /> : <Edit className="color-primary" />}
      </IconButton>
      <div className="w-100 flex-standard">
        {isEdit
          ? <AvatarEdit currentImage={`${process.env.REACT_APP_S3}/${user?.image}`} setPhoto={setImage} />
          : <Avatar src={`${process.env.REACT_APP_S3}/${user?.image}`} style={{ height: 120, width: 120 }} />}
      </div>
      {isEdit
        ? <CustomTextField label="Name" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
        : <Typography variant="h6" className="text-center mt-3 mb-4">{user?.name}</Typography>}
      {[
        { placeholder: 'Phone', value: phone, onChange: (e) => setPhone(e.target.value) },
        { placeholder: 'Email', value: user?.email, disabled: true },
        { placeholder: 'Password', value: '********', disabled: true },
      ].map(e => (
        <>
          <p className="color-primary mt-3">{e.placeholder}</p>
          {isEdit
            ? <CustomTextField {...e} />
            : <p className="font-weight-bold pb-3">{e.value ?? '-'}</p>}
        </>
      ))}
      {isEdit && (
        <Button className="my-4 float-right" disabled={isLoadingSave} onClick={onSave}>
          {isLoadingSave && <CircularProgress size={24} className="mr-2" />}
          Save changes
        </Button>
      )}
    </div>
  );
};

const CustomTextField = (props) => (
  <TextField
    variant="outlined"
    fullWidth
    size="small"
    {...props}
  />
);

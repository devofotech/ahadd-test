import moment from 'moment';
import { useState } from 'react';

export default function Hook(props) {
  const [open, set_open] = useState(false);
  const [name, set_name] = useState(props.inspectionName ?? '');
  const [description, set_description] = useState(props.inspectionDescription ?? '');
  const [date, set_date] = useState(moment(props.inspectionDate).format('YYYY-MM-DDTHH:mm') ?? moment().format('YYYY-MM-DDTHH:mm'));

  const handleSubmit = () => {
    const input = {
      name,
      description,
      date,
      pilot_name: props.inspectionUploader,
    };
    props.onSave(input, props.inspectionId);
    set_open(false);
    resetForm();
  };
  const resetForm = () => {
    set_name(props.inspectionName ?? '');
    set_description(props.inspectionDescription ?? '');
    set_date(moment(props.inspectionDate).format('YYYY-MM-DDTHH:mm') ?? moment().format('YYYY-MM-DDTHH:mm'));
  };
  return {
    open,
    set_open,
    name,
    set_name,
    description,
    set_description,
    handleSubmit,
    date,
    set_date,
  };
}

import { useState } from 'react';
import { todayDateTime } from '@Helpers';
import moment from 'moment';

export default function Hook({ project, onSave, user }) {
  const [open, set_open] = useState(false);
  const [cycle, set_cycle] = useState();
  const [date, set_date] = useState(todayDateTime);

  const handleSubmit = () => {
    if (!cycle) return;
    const input = {
      cycle,
      date,
      year: moment(date).format('YYYY'),
      pilot_name: user.name,
      assetId: project.id,
    };
    onSave(input);
    set_open(false);
    resetForm();
  };
  const resetForm = () => {
    set_date(todayDateTime);
    set_cycle();
  };
  const handleClose = () => { set_open(false); resetForm(); };
  return {
    open,
    set_open,
    cycle,
    set_cycle,
    date,
    set_date,
    handleSubmit,
    resetForm,
    handleClose,
  };
}

import { useEffect, useState } from 'react';
import { todayDateTime } from '@Helpers';

export default function Hook({
  project, onSave, user, inspectionType,
}) {
  const [open, set_open] = useState(false);
  const [name, set_name] = useState('');
  const [date, set_date] = useState(todayDateTime);
  const [description, set_description] = useState('');
  const [ProjectPhaseId, setProjectPhaseId] = useState();
  const [ModuleId, setModuleId] = useState();

  const handleSubmit = () => {
    if (!ProjectPhaseId) return;
    if (!ModuleId) return;
    if (!name) return;
    if (!description) return;
    const input = {
      name,
      date,
      description,
      ProjectPhaseId,
      ModuleId,
      pilot_name: user.name,
      assetId: project.id,
      is_map: inspectionType === 'Map' ? 1 : 0,
    };
    onSave(input);
    set_open(false);
    resetForm();
  };
  const resetForm = () => {
    set_name('');
    set_date(todayDateTime);
    set_description('');
    setProjectPhaseId(false);
    setModuleId(false);
  };
  useEffect(() => {
    setModuleId(false);
  }, [ProjectPhaseId]);
  const handleClose = () => { set_open(false); resetForm(); };
  return {
    open,
    set_open,
    name,
    set_name,
    date,
    set_date,
    description,
    set_description,
    ProjectPhaseId,
    setProjectPhaseId,
    handleSubmit,
    resetForm,
    handleClose,
    ModuleId,
    setModuleId,
  };
}

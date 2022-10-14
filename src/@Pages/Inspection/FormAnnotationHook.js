import { useEffect } from 'react';

export default function Hook({ annotation, setMainImageAnnotations }) {
  // form data changes
  const handleChangeDescription = (e) => {
    setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === annotation.id ? ({ ...ann, description: e.target.value }) : ann)));
  };
  const handleChangeSeverity = (e) => {
    setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === annotation.id ? ({ ...ann, SeverityId: Number(e.target.value) }) : ann)));
  };

  useEffect(() => {
    if (!annotation.isNew) return;
    const description = {
      1: 'Slope is in good condition and require regular routine maintenance only.',
      2: 'Defect is minor and it is necessary to record the condition for the follow-up observation purposes.',
      3: 'Defect is slightly critical, and it is necessary to carry out routine maintenance works.',
      4: 'Defect is critical and requires repair works or further investigation (to determine whether rehabilitation work is necessary).',
      5: 'Defect is critically severe and possibly affecting the safety of traffic. Emergency temporary or urgent repair need to be implemented.',
    }[annotation?.SeverityId];
    setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === annotation.id ? ({ ...ann, description }) : ann)));
  }, [annotation?.SeverityId]);

  return {
    handleChangeDescription,
    handleChangeSeverity,
  };
}

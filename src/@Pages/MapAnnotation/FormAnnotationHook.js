export default function Hook(props) {
  // form data changes
  const handleChangeParameter = (e) => {
    props.setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === props.annotation.id ? ({ ...ann, ModuleParameterId: Number(e.target.value) }) : ann)));
  };
  const handleChangeCompliance = (e) => {
    props.setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === props.annotation.id ? ({ ...ann, is_compliance: Number(e.target.value) }) : ann)));
  };
  const handleChangeDescription = (e) => {
    props.setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === props.annotation.id ? ({ ...ann, description: e.target.value }) : ann)));
  };
  const handleChangeSeverity = (e) => {
    props.setMainImageAnnotations(prevVal => prevVal
      .map(ann => (ann.id === props.annotation.id ? ({ ...ann, SeverityId: Number(e.target.value) }) : ann)));
  };
  return {
    handleChangeParameter,
    handleChangeCompliance,
    handleChangeDescription,
    handleChangeSeverity,
  };
}

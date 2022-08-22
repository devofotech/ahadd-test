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
  return {
    handleChangeDescription,
    handleChangeSeverity,
  };
}

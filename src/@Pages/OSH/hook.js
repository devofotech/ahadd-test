import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook({ division, project }) {
  const [compliances, setCompliances] = useState([]);
  const [inspectionFiles, setInspectionFiles] = useState([]);
  const [spanDays, setSpanDays] = useState(7);
  const [annotationStatistics, setAnnotationStatistics] = useState([]);
  const [selectedCompliance, setSelectedCompliance] = useState({ compliance: null, category: null });
  useEffect(() => {
    if (!project?.id) return;
    const data = {};
    data.AssetId = project.id;
    data.InspectionCategoryId = 1;
    Api({
      endpoint: endpoints.getCompliances(),
      data,
      onSuccess: (response) => setCompliances(response.data),
      onFail: setCompliances([]),
    });
  }, [project]);
  useEffect(() => {
    if (!project?.id) return;
    const data = {};
    data.AssetId = project.id;
    data.InspectionCategoryId = 1;
    if (selectedCompliance.compliance) {
      data.is_compliance = selectedCompliance.compliance === 'compliance' ? 1 : 0;
    }
    if (selectedCompliance.category) data.OshCategoryId = selectedCompliance.category;
    data.spanDays = spanDays ?? 7;
    Api({
      endpoint: endpoints.getAnnotationStatistics(),
      data,
      onSuccess: (response) => setAnnotationStatistics(response.data),
      onFail: setAnnotationStatistics([]),
    });
    Api({
      endpoint: endpoints.getAnnotations(),
      data,
      onSuccess: (response) => setInspectionFiles(response.data),
      onFail: setInspectionFiles([]),
    });
  }, [spanDays, selectedCompliance, project]);
  return {
    compliances,
    selectedCompliance,
    setSelectedCompliance,
    inspectionFiles,
    lines: annotationStatistics.map(eachGroup => ({
      ...eachGroup,
      data: eachGroup.data.map(({ Date, value }) => ({ x: Date, y: value })),
    })),
    setAnnotationStatistics,
    spanDays,
    setSpanDays,
  };
}

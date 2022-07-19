import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

export default function Hook({ projectDetails }) {
  const [inspectionFiles, setInspectionFiles] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInspectionId, setSelectedInspectionId] = useState();
  const [severities, setSeverities] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [files, setFiles] = useState([]);
  const [team, setTeam] = useState({});
  const [onRefresh, setOnRefresh] = useState(0);

  const getFiles = (id) => {
    Api({
      endpoint: endpoints.getInspectionFile(),
      data: { InspectionId: id },
      onSuccess: ({ data }) => setInspectionFiles(data),
      onFail: () => { setInspectionFiles([]); toast('error', 'Something went wrong ...'); },
    });
  };

  const getSeveritiesAndIssues = () => {
    Api({
      endpoint: endpoints.getSeverity(),
      onSuccess: ({ data }) => setSeverities(data),
      onFail: () => toast('error', 'Something went wrong ...'),
    });
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => setIssues(data.issue),
      onFail: () => toast('error', 'Something went wrong ...'),
    });
  };

  const getTeam = (id) => {
    Api({
      endpoint: endpoints.getTeam(id),
      data: { InspectionId: id },
      onSuccess: ({ data }) => setTeam(data),
      onFail: () => { setInspectionFiles([]); toast('error', 'Something went wrong ...'); },
    });
  };

  useEffect(() => {
    if (!selectedInspectionId) return;
    getFiles(selectedInspectionId);
    getSeveritiesAndIssues();
  }, [selectedInspectionId, onRefresh]);

  useEffect(() => {
    if (!inspectionFiles?.length) return;
    if (!severities?.length) return;
    const annotationList = [];
    for (let i = 0, l = inspectionFiles.length; i < l; i++) {
      const getAnnotations = inspectionFiles[i].annotations.map(e => ({
        ...e,
        path: inspectionFiles[i].thumbnail,
        color: `#${severities.filter(f => f.id == e.SeverityId)[0].colour}`,
        severity_name: severities.filter(f => f.id == e.SeverityId)[0].name,
        title: inspectionFiles[i]['Inspection.name'],
        lat: inspectionFiles[i].lat,
        lng: inspectionFiles[i].lng,
        filename: inspectionFiles[i].path.substring(15),
        inspection_date: inspectionFiles[i]['Inspection.date'],
      }));
      annotationList.push(getAnnotations.flat(1));
    }
    setAnnotations(annotationList.flat(1));
  }, [inspectionFiles, severities]);

  useEffect(() => {
    if (!issues.length) return;
    if (!projectDetails) return;
    const filteredIssues = issues.filter(f => f.AssetTypeId === projectDetails?.AssetTypeId && f.OrganizationId === projectDetails?.OrganizationId);
    setSelectedIssues(filteredIssues);
  }, [issues, projectDetails]);

  const onUploadCloseIssue = (annotationId, data, resetInput = () => null) => {
    if (!annotationId) return;
    if (!data.remark) return;
    if (!data.selectedIssueId) return;
    const input = {
      ...data,
      name: data.remark,
      expectedDueDate: data.date,
      IssueId: data.selectedIssueId,
    };
    setIsLoading(true);
    Api({
      endpoint: endpoints.closeIssue(annotationId),
      data: { input },
      files,
      onSuccess: () => {
        setOnRefresh(prev => prev + 1);
        toast('success', 'Successfully created');
        setIsLoading(false);
        resetInput();
        setFiles([]);
      },
      onFail: () => { toast('error', 'Create fail'); setIsLoading(false); },
    });
  };

  return {
    inspectionFiles,
    selectedInspectionId,
    setSelectedInspectionId,
    annotations,
    isLoading,
    severities,
    selectedIssues,
    files,
    setFiles,
    team,
    getTeam,
    onUploadCloseIssue,
  };
}

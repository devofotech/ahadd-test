/* eslint-disable max-nested-callbacks */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';
import queryString from 'query-string';

export default function Hook({
  category, project, selectedPhaseWithViewPageAccess, selected_project, user, issuesType, modules,
}) {
  const project_id = queryString.parse(window.location.search).id;
  const [inspectionSessions, setInspectionSessions] = useState([]);
  const [isDefaultSeverities, setIsDefaultSeverities] = useState(false);
  const [isDefaultIssues, setIsDefaultIssues] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(0);
  const [inspectionType, setInspectionType] = useState('Image');
  const [hasOpenIssue, setHasOpenIssue] = useState(false);
  const [assetModuleList, setAssetModuleList] = useState({});
  const [selectedPhaseId, setSelectedPhaseId] = useState(0);
  const [openInspectionTour, setOpenInspectionTour] = useState(false);
  const [tab, setTab] = useState('');
  const currentAssetPhase = selectedPhaseWithViewPageAccess[category];

  useEffect(() => {
    if (!project) return;
    if (!project.id) return;
    let flatModuleByPhase = {};
    const generalModule = modules.find(f => f.OrganizationId == user.OrganizationId && !!f.is_general);
    if (project.module_parameters?.length) {
      const asset_module_groupBy = _(project.module_parameters)
        .groupBy(x => x.ProjectPhaseId)
        .map((x, id) => ({
          [id]: Object.assign(
            ...[
              { [generalModule?.id]: { ...generalModule, filter: { ModuleId: generalModule?.id, ProjectPhaseId: Number(id) } } },
              ...(
                _.uniq(x.map(y => y.ModuleId))
              ).map(ModuleId => ({
                [ModuleId]: { ...modules.find(e => e.id == Number(ModuleId)), filter: { ModuleId, ProjectPhaseId: Number(id) } },
              })),
            ],
          ),
        }))
        .value();

      flatModuleByPhase = Object.assign(...asset_module_groupBy);
    }
    const eachPhaseInProject = project.selectedPhase.split(',').map(Number);
    for (let pidx = 0; pidx < eachPhaseInProject.length; pidx++) {
      const ProjectPhaseId = eachPhaseInProject[pidx];
      if (!flatModuleByPhase[ProjectPhaseId]) {
        flatModuleByPhase[ProjectPhaseId] = { [generalModule?.id]: { ...generalModule, filter: { ModuleId: generalModule?.id, ProjectPhaseId } } };
      }
    }
    setAssetModuleList(flatModuleByPhase);
  }, [project]);
  const refresh = () => {
    if (!project?.id || !project_id) return;
    if (!currentAssetPhase?.id) return;
    setIsLoading(true);
    const data = {};
    data.AssetId = project?.id ?? project_id;
    data.ProjectPhaseId = currentAssetPhase?.id;
    Api({
      endpoint: endpoints.getInspectionSession(),
      data,
      onSuccess: (response) => {
        setInspectionSessions(response.data);
        setIsLoading(false);
      },
      onFail: setInspectionSessions([]),
    });
  };

  useEffect(() => {
    setIsDefaultIssues(!issuesType.length);
  }, [issuesType]);

  useEffect(() => {
    if (!project?.id) return;
    refresh();
    const assetType = Object.keys(_.groupBy(project?.severity, 'AssetTypeId'))[0];
    setIsDefaultSeverities(!Number(assetType));
  }, [project, category, selectedPhaseWithViewPageAccess, isUpdated]);

  useEffect(() => {
    setHasOpenIssue(false);
    setSelectedPhaseId(currentAssetPhase?.id);
  }, [category, selected_project, selectedPhaseWithViewPageAccess]);

  const deleteInspection = (id) => {
    if (!id) return;
    Api({
      endpoint: endpoints.deleteInspection(id),
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully deleted');
      },
      onFail: () => toast('error', 'Delete fail'),
    });
  };
  const createInspection = (data) => {
    if (!data.assetId) return;
    if (!data.name) return;
    if (!data.date) return;
    Api({
      endpoint: endpoints.newInspection(data.assetId),
      data,
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully created');
      },
      onFail: () => toast('error', 'Create fail'),
    });
  };
  const updateInspection = (data, inspectionId) => {
    Api({
      endpoint: endpoints.updateInspection(inspectionId),
      data,
      onSuccess: () => {
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully updated');
      },
      onFail: () => toast('error', 'Failed to update inspection'),
    });
  };
  const tabsList = !!assetModuleList[currentAssetPhase?.id]
    ? _.orderBy(Object.values(assetModuleList[currentAssetPhase?.id]), ['is_general'], ['desc'])
    : [];
  useEffect(() => {
    if (!tabsList.length) return;
    setTab(tabsList[0].value);
  }, [category, assetModuleList, inspectionSessions]);
  return {
    inspectionSessions,
    deleteInspection,
    createInspection,
    tabsList,
    isDefaultSeverities,
    isDefaultIssues,
    isLoading,
    updateInspection,
    inspectionType,
    setInspectionType,
    setIsUpdated,
    hasOpenIssue,
    accessOpenIssueList: [3, 4],
    selectedPhaseId,
    assetModuleList,
    currentAssetPhase,
    tab,
    setTab,
    openInspectionTour,
    setOpenInspectionTour,
    project_id,
  };
}

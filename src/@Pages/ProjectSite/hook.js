/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import { arrayRearrange } from '@Helpers';

export default function Hook({ user, setIsOpen }) {
  const [divisions, set_divisions] = useState([]);
  const [projects, set_projects] = useState([]);
  const [filtered_projects, set_filtered_projects] = useState([]);
  const [selected_project, set_selected_project] = useState(0);
  const [special_project_idx, set_special_project_idx] = useState(0);
  const [category, set_category] = useState(0);
  const [phases, set_phases] = useState([]);
  const [severityList, setSeverityList] = useState([]);
  const [severityAsset, setSeverityAsset] = useState([]);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [phasesWithPageAccess, setPhasesWithPageAccess] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [storages, setStorages] = useState([]);
  const [currentPlan, setCurrentPlan] = useState('');
  const [oshCategory, setOshCategory] = useState([]);
  const [environmentCategory, setEnvironmentCategory] = useState([]);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [justUpdated, setJustUpdated] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [piechartType, setPiechartType] = useState(0);
  const [issues, setIssues] = useState([]);
  const [issuesType, setIssuesType] = useState([]);
  const [modules, setModules] = useState([]);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const queryParam = queryString.parse(location.search);
  const prefixLocation = location.pathname.split('/');
  const isOrgUnlimited = !!user?.['Organization.StoreStorage.is_token_unlimited'];
  const [sections, setSections] = useState([]);
  const [regions, setRegions] = useState([]);

  const deleteFile = (id) => {
    Api({
      endpoint: endpoints.deleteAssetFile(id),
      onSuccess: () => {
        toast('success', 'Asset File Successfully deleted');
        setJustUpdated(prev => prev + 1);
      },
      onFail: () => toast('error', 'Failed to delete asset file'),
    });
  };
  const getCurrentPlan = (OrgId) => {
    if (!OrgId) return;
    Api({
      endpoint: endpoints.getOrganization(OrgId),
      onSuccess: ({ data }) => {
        setCurrentPlan(data['StoreStorage.name']);
        setIsLoading(false);
      },
      onFail: (response) => console.log('lol'),
    });
  };

  useEffect(() => {
    setIsLoading(true)
    if (!user) return;
    getCurrentPlan(user.OrganizationId);
  }, [user]);

  useEffect(() => {
    setIsLoadingMap(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        set_projects(data);
        setIsLoadingMap(false);
      },
      onFail: (err) => toast('error', err),
    });
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({
        data: { AssetType, Region, Section },
      }) => {
        setAssetTypeList(AssetType ?? []);
        setRegions(Region ?? []);
        setSections(Section ?? []);
      },
      onFail: (err) => toast('error', err),
    });
    Api({
      endpoint: endpoints.getSeverities(),
      onSuccess: (res) => {
        setSeverityList(res.data);
      },
    });
    // getModules();
    // getAllParameters();
  }, []);

  useEffect(() => {
    setPhasesWithPageAccess(phases.map((e, idx) => ({
      ...e,
      viewPageAccess: checkPageAccess[idx].view,
      addPageAccess: checkPageAccess[idx].add,
      editPageAccess: checkPageAccess[idx].edit,
      removePageAccess: checkPageAccess[idx].remove,
      remove3DAccess: checkDeleteAccess[idx]['3d'],
      remove360Access: checkDeleteAccess[idx][360],
      removeReportAccess: checkDeleteAccess[idx].report,
    })));
  }, [phases]);

  const resetSelectedProject = () => {
    if (queryParam?.id) {
      set_selected_project(!!projects ? projects?.findIndex(x => x.id == queryParam.id) : -1);
    } else {
      set_selected_project(0);
    }
    setShowSidebar(!!prefixLocation[2]);
  };

  useEffect(() => {
    resetSelectedProject();
  }, [queryParam.id]);

  useEffect(() => {
    if (!projects.length) return;
    set_filtered_projects(projects);
    if (!!prefixLocation[2]) setShowSidebar(true);
    resetSelectedProject();
    set_category(0);
  }, [projects]);

  useEffect(() => {
    set_category(0);
    if (!projects.length) return;
    const checkLocationIFrame = !!prefixLocation[3] ? `/${prefixLocation[3]}` : '';
    const checkLocation = !!prefixLocation[2] ? `/${prefixLocation[2]}${checkLocationIFrame}` : '';
    if (!!queryParam?.id) return history.push(`/project${checkLocation}?id=${project?.id}`);
  }, [justUpdated, selected_project]);

  useEffect(() => {
    if (!severityList.length) return;
    const severity = severityList.filter(f => f.AssetTypeId == filtered_projects[selected_project]?.AssetTypeId && f.OrganizationId == filtered_projects[selected_project]?.OrganizationId);
    setSeverityAsset(!!severity.length ? severity : severityList.filter(f => f.AssetTypeId === null));
  }, [severityList, filtered_projects]);

  useEffect(() => {
    if (!issues.length) return;
    const filteredIssue = issues.filter(f => f.AssetTypeId === filtered_projects[selected_project]?.AssetTypeId && f.OrganizationId === filtered_projects[selected_project]?.OrganizationId);
    setIssuesType(filteredIssue);
  }, [issues, filtered_projects, selected_project]);

  // useEffect(() => {
  //   if (!projects.length) return;
  // const division_uuid = divisions?.[selected_division]?.uuid;
  // const filterProject = projects.filter((p) => p.Division.uuid === division_uuid);
  // set_filtered_projects([
  //   { name: 'View All Projects', lat: divisions?.[selected_division]?.lat, lng: divisions?.[selected_division]?.lng },
  //   ...filterProject,
  // ]);
  //   set_selected_project(0);
  // }, [projects, divisions, selected_division]);
  // console.log('mm2', filtered_projects[selected_project]);
  const checkPageAccess = [
    {
      view: !!user?.can_view_planning, add: !!user?.can_add_planning, edit: !!user?.can_edit_planning, remove: !!user?.can_remove_planning,
    },
    {
      view: !!user?.can_view_development, add: !!user?.can_add_development, edit: !!user?.can_edit_development, remove: !!user?.can_remove_development,
    },
    {
      view: !!user?.can_view_construction, add: !!user?.can_add_construction, edit: !!user?.can_edit_construction, remove: !!user?.can_remove_construction,
    },
    {
      view: !!user?.can_view_om, add: !!user?.can_add_om, edit: !!user?.can_edit_om, remove: !!user?.can_remove_om,
    },
    {
      view: !!user?.can_view_decommission, add: !!user?.can_add_decommission, edit: !!user?.can_edit_decommission, remove: !!user?.can_remove_decommission,
    },
  ];
  const checkDeleteAccess = [
    { '3d': !!user?.can_remove_3d_planning, 360: !!user?.can_remove_360_planning, report: !!user?.can_remove_report_planning },
    { '3d': !!user?.can_remove_3d_development, 360: !!user?.can_add_development, report: !!user?.can_remove_report_development },
    { '3d': !!user?.can_remove_3d_construction, 360: !!user?.can_remove_360_construction, report: !!user?.can_remove_report_construction },
    { '3d': !!user?.can_remove_3d_om, 360: !!user?.can_remove_360_om, report: !!user?.can_remove_report_om },
    { '3d': !!user?.can_remove_3d_decommission, 360: !!user?.can_remove_360_decommission, report: !!user?.can_remove_report_decommission },
  ];
  const project = filtered_projects.length ? filtered_projects[selected_project] : projects[selected_project] || {};
  const selectedPhaseList = phasesWithPageAccess.filter(({ id }) => project.selectedPhase?.split(',').map(e => Number(e)).includes(id));
  const selectedPhaseWithViewPageAccess = selectedPhaseList.filter(e => e.viewPageAccess);
  const projectWithCurrentPhase = arrayRearrange(selectedPhaseWithViewPageAccess, !!project.currentPhase ? selectedPhaseWithViewPageAccess.findIndex(obj => obj.id === Number(project.currentPhase)) : 0, 0);
  return {
    // divisions,
    // division: divisions[selected_division] || {},
    // selected_division,
    // set_selected_division,
    projects,
    project: !!(showSidebar || queryParam.id) ? project : {},
    mapType: project?.mapType ?? 'ROADMAP',
    filtered_projects,
    selected_project,
    set_selected_project,
    special_project_idx,
    noSpecial: special_project_idx === divisions.length,
    category,
    set_category,
    phases,
    selectedPhaseList,
    severityAsset,
    assetTypeList,
    selectedPhaseWithViewPageAccess: !!project.currentPhase && !!selectedPhaseWithViewPageAccess.length ? projectWithCurrentPhase : selectedPhaseWithViewPageAccess,
    showSidebar,
    setShowSidebar,
    storages,
    currentPlan,
    user,
    plan: Object.assign({}, ...storages.filter(p => p.name === currentPlan)),
    openInfoDialog,
    setOpenInfoDialog,
    environmentCategory,
    oshCategory,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteFile,
    selectedFile,
    setSelectedFile,
    piechartType,
    setPiechartType,
    issuesType,
    modules,
    moduleParameter: _.groupBy(project?.module_parameters, 'ModuleId'),
    isOrgUnlimited,
    isLoadingMap,
    isLoading,
    sections,
    regions,
  };
}

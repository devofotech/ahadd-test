/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { searchItems } from '@Helpers';

export default function Hook() {
  const { workflow_id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAsset, setIsLoadingAsset] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [workflow, setWorkflow] = useState([]);
  const [assetAccessList, setAssetAccessList] = useState([]);
  const [allAssetAccessList, setAllAssetAccessList] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [justUpdated, setJustUpdated] = useState(0);
  const [assetTypeId, setAssetTypeId] = useState();
  const [issues, setIssues] = useState();

  const getWorkflows = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getWorkflows(),
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setWorkflows(data);
      },
      onFail: () => { toast('error', 'Failed get workflow list data'); },
    });
  };

  const getWorkflow = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.showWorkflow(workflow_id),
      onSuccess: ({ data }) => {
        setWorkflow(data);
        setSelectedAsset(_.uniq(data.AssetAccesses.map(e => e.AssetId)));
        setIsLoading(false);
      },
      onFail: () => { toast('error', 'Failed get workflow data'); },
    });
  };

  const getTeams = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getTeams(),
      onSuccess: ({ data }) => {
        setTeams(data);
        setIsLoading(false);
      },
      onFail: () => { toast('error', 'Failed get team data'); },
    });
  };

  const getAssetAccessList = () => {
    setIsLoadingAsset(true);
    Api({
      endpoint: endpoints.getAssets(),
      data: { WorkflowId: workflow_id },
      onSuccess: ({ data }) => {
        setAssetAccessList(data);
        setAllAssetAccessList(data);
        setIsLoadingAsset(false);
        setJustUpdated(prev => prev + 1);
      },
      onFail: () => { toast('error', 'Failed get asset access data'); setIsLoadingAsset(false); },
    });
  };

  useEffect(() => {
    getWorkflows();
    getWorkflow();
    getTeams();
    getAssetAccessList();
  }, [workflow_id]);

  const deleteWorkflow = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteWorkflow(workflow_id),
      onSuccess: () => {
        setIsLoading(false);
        toast('success', `Successfully delete ${workflow.name} workflow.`);
        history.push('/analysis-management');
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const disableWorkflow = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateWorkflow(workflow_id),
      data: { is_freeze: !workflow.is_freeze },
      onSuccess: ({ data }) => {
        setIsLoading(false);
        getWorkflows();
        getWorkflow();
        toast('success', `${workflow.name} workflow has been ${!data.is_freeze ? 'disabled' : 'enabled'}`);
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const onAddTeamToWorkflow = (teamId) => {
    if (!teamId) return;
    const data = { WorkflowId: workflow_id, TeamId: teamId };
    setIsLoading(true);
    Api({
      endpoint: endpoints.createWorkflowTeam(),
      data,
      onSuccess: () => {
        setIsLoading(false);
        getWorkflows();
        getWorkflow();
        toast('success', 'Successfully add team to workflow.');
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const onDeleteWorkflowTeam = (workflowTeamId) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteWorkflowTeam(workflowTeamId),
      onSuccess: () => {
        setIsLoading(false);
        getWorkflows();
        getWorkflow();
        toast('success', 'Successfully delete the team from workflow');
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const onUpdateWorkflowTeam = (workflowTeamId, issue) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateWorkflowTeam(workflowTeamId),
      data: { issue },
      onSuccess: () => {
        setIsLoading(false);
        getWorkflows();
        getWorkflow();
        toast('success', 'Successfully update the team role');
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const updateWorkflowAssetAccess = (AssetsId) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateWorkflow(workflow_id),
      data: { assets: AssetsId },
      onSuccess: () => {
        setIsLoading(false);
        getWorkflows();
        getWorkflow();
        getAssetAccessList();
        setSearchKey('');
        toast('success', 'Successfully update assigned asset');
      },
      onFail: () => { toast('error', 'Failed update asset access data'); getAssetAccessList(); },
    });
  };

  useEffect(() => {
    if (!allAssetAccessList.length) return;
    const keys = ['name'];
    const values = [searchKey];
    const result = searchItems(allAssetAccessList, keys, values);
    if (!assetTypeId) return setAssetAccessList(result);
    return setAssetAccessList(result.filter(e => e.AssetTypeId === assetTypeId));
  }, [searchKey, assetTypeId, justUpdated]);

  useEffect(() => {
    if (!selectedAsset[0]) return setAssetTypeId();
    if (!allAssetAccessList.length) return;
    setAssetTypeId(allAssetAccessList.find(e => e.id == selectedAsset[0])?.AssetTypeId);
  }, [selectedAsset, allAssetAccessList]);

  useEffect(() => {
    if (!assetTypeId) return;
    Api({
      endpoint: endpoints.getIssues(),
      data: { AssetTypeId: assetTypeId, OrganizationId: workflow.OrganizationId },
      onSuccess: ({ data }) => {
        const issueList = data.map((m, idx) => ({
          id: idx + 1,
          name: m.name.toUpperCase(),
          value: m.name.replace(/- /, '').toLowerCase(),
          color: m.colour,
          seqId: m.sequence_id,
        }));
        setIssues(issueList ?? []);
      },
      onFail: (error) => toast('error', error),
    });
  }, [assetTypeId]);

  const toggleAssetAccess = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedAsset, Number(event.target.value)]);
      setSelectedAsset(data);
      updateWorkflowAssetAccess(data.join(','));
      return;
    }
    data = selectedAsset.filter(u => u !== Number(event.target.value));
    setSelectedAsset(data);
    updateWorkflowAssetAccess(data.join(','));
  };

  return {
    isLoading,
    isLoadingAsset,
    workflow_id,
    workflows,
    workflow,
    teams,
    deleteWorkflow,
    disableWorkflow,
    onAddTeamToWorkflow,
    onDeleteWorkflowTeam,
    onUpdateWorkflowTeam,
    assetAccessList,
    selectedAsset,
    setSelectedAsset,
    updateWorkflowAssetAccess,
    searchKey,
    setSearchKey,
    toggleAssetAccess,
    issues,
  };
}

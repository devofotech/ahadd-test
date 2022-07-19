/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';

export default function Hook() {
  const { id } = useParams();
  const history = useHistory();
  const [moduleName, setModuleName] = useState('');
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const [phase, setPhase] = useState([]);
  const [selectedAssetType, setSelectedAssetType] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState([]);
  const [selectedSettings, setSelectedSettings] = useState([]);
  const [parameter, setParameter] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [isUpdated, setIsUpdated] = useState(0);

  const getModules = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getModules(),
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setModules(data);
      },
      onFail: () => { toast('error', 'Failed get workflow list data'); },
    });
  };

  const getModule = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.showModule(id),
      onSuccess: ({ data }) => {
        setModule(data);
        setIsLoading(false);
        setModuleName(data.name);
      },
      onFail: () => { toast('error', 'Failed get workflow data'); },
    });
  };

  const getStatistic = () => {
    setIsLoadingSelected(true);
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setAssetType(data.AssetType.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
        setPhase(data.projectphase.reduce((a, b) => { a[b.id] = b.name; return a; }, {}));
        setIsLoadingSelected(false);
      },
      onFail: () => toast('error', 'Error getting data. Please try again later.'),
    });
  };

  const getAllParameters = () => {
    setIsLoadingSelected(true);
    Api({
      endpoint: endpoints.getParameters(),
      onSuccess: ({ data }) => setParameterList(_.groupBy(data, 'ModuleId')),
      onFail: () => toast('error', 'Error getting data. Please try again later.'),
    });
  };

  const getParameters = () => {
    setIsLoadingSelected(true);
    Api({
      endpoint: endpoints.getParameters(id),
      data: { ModuleId: id },
      onSuccess: ({ data }) => {
        setParameter(data);
        setIsLoadingSelected(false);
      },
      onFail: () => toast('error', 'Error getting data. Please try again later.'),
    });
  };

  useEffect(() => {
    getModules();
    getModule();
    getStatistic();
    getParameters();
    getAllParameters();
  }, [id, isUpdated]);

  useEffect(() => {
    if (!module) return;
    setSelectedPhase(String(module.phase_ids).split(',').map(m => Number(m)));
    setSelectedAssetType(String(module.assettype_ids).split(',').map(m => Number(m)));
    setSelectedSettings(String(module.settings).split(',').map(m => m));
  }, [module]);

  const toggleSwitchAssetType = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedAssetType, Number(event.target.value)]);
      setSelectedAssetType(data);
      updateAssetType(data.join(','));
      return;
    }
    data = selectedAssetType.filter(u => u !== Number(event.target.value));
    setSelectedAssetType(data);
    updateAssetType(data.join(','));
  };

  const toggleSwitchPhase = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedPhase, Number(event.target.value)]);
      setSelectedPhase(data);
      updatePhase(data.join(','));
      return;
    }
    data = selectedPhase.filter(u => u !== Number(event.target.value));
    setSelectedPhase(data);
    updatePhase(data.join(','));
  };

  const toggleSwitchSettings = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedSettings, String(event.target.value)]);
      setSelectedSettings(data);
      updateSetting(data.join(','));
      return;
    }
    data = selectedSettings.filter(u => u !== String(event.target.value));
    setSelectedSettings(data);
    updateSetting(data.join(','));
  };

  const handleUpdateParameter = (event, paramsId) => {
    let data = { is_active: Boolean };
    if (event.target.checked) {
      data = { is_active: true };
      updateParameter(paramsId, data);
      return;
    }
    data = { is_active: false };
    updateParameter(paramsId, data);
  };

  const updateAssetType = (AssetTypeId) => {
    setIsLoading(true);
    const data = { input: { assettype_ids: AssetTypeId } };
    Api({
      endpoint: endpoints.updateModule(id),
      data,
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update Asset Type');
      },
      onFail: () => { toast('error', 'Failed update Asset Type'); },
    });
  };

  const updatePhase = (PhaseId) => {
    setIsLoading(true);
    const data = { input: { phase_ids: PhaseId } };
    Api({
      endpoint: endpoints.updateModule(id),
      data,
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update phase');
      },
      onFail: () => { toast('error', 'Failed update phase'); },
    });
  };

  const updateSetting = (settings) => {
    setIsLoading(true);
    const data = { input: { settings } };
    Api({
      endpoint: endpoints.updateModule(id),
      data,
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update settings');
      },
      onFail: () => { toast('error', 'Failed update settings'); },
    });
  };

  const deleteModule = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteModule(id),
      onSuccess: () => {
        setIsLoading(false);
        toast('success', `Successfully delete ${module.name} module.`);
        history.push('/module-management');
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const disableModule = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateModule(id),
      data: { input: { is_freeze: !!Number(module.is_freeze) ? 0 : 1 } },
      onSuccess: ({ data }) => {
        setIsLoading(false);
        getModules();
        getModule();
        getParameters();
        toast('success', `${module.name} module has been ${!data.is_freeze ? 'disabled' : 'enabled'}`);
      },
      onFail: () => { toast('error', 'Error occurred, please try again later.'); },
    });
  };

  const createParameter = (label) => {
    const name = label.toLowerCase().replace(/ /g, '_');
    const data = {
      name,
      label,
      ModuleId: id,
    };
    setIsLoading(true);
    Api({
      endpoint: endpoints.createParameter(),
      data,
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update parameter');
      },
      onFail: () => { toast('error', 'Failed update parameter'); },
    });
  };

  const updateParameter = (parameterId, is_active) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateParameter(parameterId),
      data: { input: is_active },
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update parameter');
      },
      onFail: () => { toast('error', 'Failed update parameter'); },
    });
  };

  const updateModuleName = () => {
    if (!moduleName) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.updateModule(id),
      data: { input: { name: moduleName } },
      onSuccess: () => {
        setIsLoading(false);
        setIsUpdated(prev => prev + 1);
        toast('success', 'Successfully update Module Name');
        getModules();
      },
      onFail: () => { toast('error', 'Failed update Module Name'); },
    });
  };

  return {
    isLoading,
    isLoadingSelected,
    module_id: id,
    modules,
    module,
    phase,
    assetType,
    selectedAssetType,
    setSelectedAssetType,
    selectedPhase,
    setSelectedPhase,
    selectedSettings,
    setSelectedSettings,
    parameter,
    setParameter,
    parameterList,
    toggleSwitchAssetType,
    toggleSwitchPhase,
    toggleSwitchSettings,
    handleUpdateParameter,
    deleteModule,
    disableModule,
    setSearchKey,
    createParameter,
    updateParameter,
    moduleName,
    setModuleName,
    updateModuleName,
  };
}

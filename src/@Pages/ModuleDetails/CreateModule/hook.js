import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

export default function Hook() {
  const history = useHistory();
  const [modules, setModules] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const [phase, setPhase] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);
  const [name, setName] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedSettings, setSelectedSettings] = useState('');
  const [parameterList, setParameterList] = useState([]);

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

  useEffect(() => {
    getModules();
    getStatistic();
    getAllParameters();
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const toggleSwitchAssetType = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedAssetType, Number(event.target.value)]);
      setSelectedAssetType(data);
      return;
    }
    data = selectedAssetType.filter(u => u !== Number(event.target.value));
    setSelectedAssetType(data);
  };

  const toggleSwitchPhase = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedPhase, Number(event.target.value)]);
      setSelectedPhase(data);
      return;
    }
    data = selectedPhase.filter(u => u !== Number(event.target.value));
    setSelectedPhase(data);
  };

  const toggleSwitchSettings = (event) => {
    let data = [];
    if (event.target.checked) {
      data = _.uniq([...selectedSettings, String(event.target.value)]);
      setSelectedSettings(data);
      return;
    }
    data = selectedSettings.filter(u => u !== String(event.target.value));
    setSelectedSettings(data);
  };

  const createModule = () => {
    const data = {
      name,
      assettype_ids: selectedAssetType.join(','),
      phase_ids: selectedPhase.join(','),
      settings: selectedSettings.join(','),
    };
    Api({
      endpoint: endpoints.createModule(),
      data,
      onSuccess: ({ data: h }) => {
        history.push(`${h.id}`);
      },
      onFail: () => toast('error', 'Error creating module. Please try again later.'),
    });
  };

  return {
    modules,
    assetType,
    phase,
    name,
    selectedAssetType,
    setSelectedAssetType,
    selectedPhase,
    setSelectedPhase,
    selectedSettings,
    setSelectedSettings,
    parameterList,
    parameter: [],
    handleChangeName,
    toggleSwitchAssetType,
    toggleSwitchPhase,
    toggleSwitchSettings,
    createModule,
    isLoading,
    isLoadingSelected,
  };
}

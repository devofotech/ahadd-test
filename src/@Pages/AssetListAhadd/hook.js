import { useEffect, useRef, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import _ from 'lodash';

export default function Hook() {
  const [allProjects, setAllProjects] = useState([]);
  const [searchProjects, setSearchProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tagsFilter, setTagsFilter] = useState(['']);
  const [openRelative, setOpenRelative] = useState(false);
  const [workflowAccess, setWorkflowAccess] = useState([]);
  const [teamAccess, setTeamAccess] = useState([]);
  const [userAccess, setUserAccess] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [sections, setSections] = useState([]);
  const [regions, setRegions] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedRanking, setSelectedRanking] = useState([]);
  const filterType = {
    RegionId: selectedRegion, NetworkId: selectedNetwork, SectionId: selectedSection, RankingId: selectedRanking,
  };
  const anchorRef = useRef(null);

  useEffect(() => {
    refresh();
    getStaticData();
  }, []);

  const refresh = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAllProjects(data);
        setSearchProjects(data);
        setFilterProjects(null);
        setIsLoading(false);
      },
      onFail: (err) => { toast('error', err); setIsLoading(false); },
    });
  };

  const getStaticData = () => {
    Api({
      endpoint: endpoints.getStaticData(),
      onSuccess: ({ data }) => {
        setNetworks(data.Network.map(m => ({ label: m.name, value: m.id })));
        setRegions(data.Region.map(m => ({ label: m.name, value: m.id })));
        setSections(data.Section.map(m => ({ label: m.name, value: m.id })));
        setRankings(data.Ranking.map(m => ({ label: m.name, value: m.id })));
      },
      onFail: (err) => toast('error', err),
    });
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (!filterProjects && !!!search) {
      setSearchProjects(allProjects);
      return;
    }
    if (filterProjects) {
      const result = filterProjects?.filter((data) => {
        return data.name?.toLowerCase().search(search) != -1;
      });
      setSearchProjects(result);
      return;
    }
    const result = allProjects?.filter((data) => {
      return data.name?.toLowerCase().search(search) != -1;
    });
    setSearchProjects(result);
  };

  const handleFilter = (e) => {
    const filter = e.target.value.toLowerCase();
    if (filter === '0') {
      setSearchProjects(allProjects);
      setFilterProjects(null);
      return;
    }
    const result = allProjects?.filter((data) => {
      return data.state.toLowerCase().search(filter) != -1;
    });
    setSearchProjects(result);
    setFilterProjects(result);
  };

  const deleteAsset = () => {
    if (!selectedAsset.id) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteAssets(selectedAsset.id),
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully deleted');
      },
      onFail: (err) => { toast('error', err); setIsLoading(false); },
    });
  };

  useEffect(() => {
    const hasFilterType = (Object.keys(filterType).map(m => filterType[m].length)).filter(f => !!f);
    const selectedFilteredType = [];
    Object.keys(filterType).forEach(m => {
      if (filterType[m].length) selectedFilteredType.push({ [m]: filterType[m] });
    });
    const filteredTypeObj = Object.assign({}, ...selectedFilteredType);
    if (!hasFilterType.length) {
      setSearchProjects(allProjects);
    } else {
      const result = allProjects.filter(project => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in filteredTypeObj) {
          if (project[key] === undefined || !filteredTypeObj[key].includes(project[key])) return false;
        }
        return true;
      });
      setSearchProjects(_.uniq(result.flat()));
    }
  }, [selectedRegion, selectedNetwork, selectedSection, selectedRanking]);

  return {
    projects: filterProjects?.length ? filterProjects && searchProjects : searchProjects,
    searchProjects,
    setSearchProjects,
    handleSearch,
    handleFilter,
    deleteAsset,
    selectedAsset,
    setSelectedAsset,
    open,
    setOpen,
    isLoading,
    anchorRef,
    tagsFilter,
    setTagsFilter,
    filterProjects,
    openRelative,
    setOpenRelative,
    workflowAccess,
    setWorkflowAccess,
    teamAccess,
    setTeamAccess,
    userAccess,
    setUserAccess,
    refreshAsset: refresh,
    networks,
    regions,
    sections,
    rankings,
    selectedNetwork,
    setSelectedNetwork,
    selectedRegion,
    setSelectedRegion,
    selectedSection,
    setSelectedSection,
    selectedRanking,
    setSelectedRanking,
  };
}

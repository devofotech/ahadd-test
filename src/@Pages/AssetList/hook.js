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
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState(['']);
  const [openCustomMenu, setOpenCustomMenu] = useState(false);
  const [openRelative, setOpenRelative] = useState(false);
  const [workflowAccess, setWorkflowAccess] = useState([]);
  const [teamAccess, setTeamAccess] = useState([]);
  const [userAccess, setUserAccess] = useState([]);
  const [view, setView] = useState('card');
  const anchorRef = useRef(null);

  const handleToggle = () => setOpenCustomMenu((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpenCustomMenu(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenCustomMenu(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAssets(),
      onSuccess: ({ data }) => {
        setAllProjects(data);
        setSearchProjects(data);
        setFilterProjects(null);
        setTags(data.map(d => d.asset_type));
        setIsLoading(false);
      },
      onFail: (err) => { toast('error', err); setIsLoading(false); },
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
    if (tagsFilter.length === 0) {
      setSearchProjects(allProjects);
    } else {
      const result = tagsFilter.map(data => {
        const projs = [...allProjects].filter(x => !!x.asset_type);

        return projs?.filter(project => {
          return project.asset_type.toLowerCase().search(data.toLowerCase()) != -1;
        });
      });
      setSearchProjects(_.uniq(result.flat()));
    }
  }, [tagsFilter]);

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
    openCustomMenu,
    anchorRef,
    handleToggle,
    handleClose,
    handleListKeyDown,
    tags: _.uniq(tags.filter(tag => !!tag).map(t => (t.indexOf(',') > -1 ? t.split(',') : t)).flat()),
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
    view,
    setView,
    refreshAsset: refresh,
  };
}

/* eslint-disable max-nested-callbacks */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import queryString from 'query-string';

export default function Hook({ project }) {
  const project_id = queryString.parse(window.location.search).id;
  const [inspectionSessions, setInspectionSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openInspectionTour, setOpenInspectionTour] = useState(false);
  const [keys, setKeys] = useState('id');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const refresh = () => {
    if (!project?.id || !project_id) return;
    setIsLoading(true);
    const data = { paginate: true };
    data.page = page;
    data.perpage = perPage;
    data.filter = `AssetId,${project?.id ?? project_id}${(!!keys && keyword) && `,${keys},${keyword}`}`;
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
    if (!project?.id || !project_id) return;
    refresh();
  }, [project, perPage, page]);

  const deleteInspection = (id) => {
    if (!id) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.deleteInspection(id),
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully deleted');
        setIsLoading(false);
      },
      onFail: () => {
        toast('error', 'Failed to delete inspection');
        setIsLoading(false);
      },
    });
  };
  const createInspection = (data) => {
    if (!data.assetId) return;
    if (!data.cycle) return;
    if (!data.date) return;
    setIsLoading(true);
    Api({
      endpoint: endpoints.newInspection(data.assetId),
      data,
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully created');
        setIsLoading(false);
      },
      onFail: () => {
        toast('error', 'Failed to create inspection');
        setIsLoading(false);
      },
    });
  };
  const updateInspection = (data, inspectionId) => {
    Api({
      endpoint: endpoints.updateInspection(inspectionId),
      data,
      onSuccess: () => {
        refresh();
        toast('success', 'Successfully updated');
      },
      onFail: () => toast('error', 'Failed to update inspection'),
    });
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') refresh();
  };
  const onCloseSearch = () => { setKeyword(''); refresh(); };

  return {
    inspectionSessions,
    deleteInspection,
    createInspection,
    isLoading,
    setIsLoading,
    updateInspection,
    openInspectionTour,
    setOpenInspectionTour,
    project_id,
    keys,
    setKeys,
    keyword,
    setKeyword,
    page,
    setPage,
    perPage,
    setPerPage,
    onKeyDown,
    onCloseSearch,
  };
}

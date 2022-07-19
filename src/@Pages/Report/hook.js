import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook({ division, project }) {
  const [reports, setReports] = useState([]);
  const [storedReports, setStoredReports] = useState([]);
  const [siteReports, setSiteReports] = useState([]);
  const [justUpdated, setJustUpdated] = useState(false);
  useEffect(() => {
    const data = {};
    if (project?.uuid) {
      data.project_uuid = project.uuid;
    } else if (project?.name === 'View All Projects') {
      data.DivisionId = division.id;
    } else {
      data.filterOnly = 'osh';
    }
    Api({
      endpoint: endpoints.getReports(),
      data,
      onSuccess: (response) => setReports(response.data),
      onFail: setReports([]),
    });
    Api({
      endpoint: endpoints.getStoredReport(),
      data,
      onSuccess: (response) => setStoredReports(response.data),
      onFail: setStoredReports([]),
    });
    Api({
      endpoint: endpoints.getSiteReport(project.id, 'site-reports'),
      onSuccess: (response) => setSiteReports(response.data),
      onFail: setSiteReports([]),
    });
    setJustUpdated(false);
  }, [project, justUpdated]);
  const onSave = (data) => {
    Api({
      endpoint: endpoints.createReport(),
      data,
      onSuccess: (response) => {
        toast('success', 'Successfully Create ');
        setJustUpdated(true);
      },
      onFail: console.log('lol'),
    });
  };
  const onDelete = (id) => {
    Api({
      endpoint: endpoints.deleteReport(id),
      onSuccess: (response) => {
        toast('success', 'Successfully Delete ');
        setJustUpdated(true);
      },
      onFail: console.log('lol'),
    });
  };

  const deleteSiteReport = (id) => {
    Api({
      endpoint: endpoints.deleteAssetFile(id),
      onSuccess: () => {
        toast('success', 'Successfully Delete ');
        setJustUpdated(true);
      },
      onFail: console.log('lol'),
    })
  }
  return {
    reports,
    onDelete,
    onSave,
    storedReports,
    siteReports,
    deleteSiteReport,
  };
}

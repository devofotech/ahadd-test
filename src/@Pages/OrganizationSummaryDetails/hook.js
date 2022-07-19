import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api, { endpoints } from '@Helpers/api';
import moment from 'moment';

export default function Hook() {
  const { id } = useParams();
  const [organization_detail, setorganization_detail] = useState(null);
  const [storage_capacity_count, setstorage_capacity_count] = useState([
    { key: 'asset', name: 'Asset', value: 0, max: 0 },
    { key: '3d', name: '3D', value: 0 },
    { key: 'orthophotos', name: '2D', value: 0 },
    { key: 'inspections', name: 'Inspection', value: 0 },
    { key: 'site-reports', name: 'Report', value: 0 },
  ]);
  const [user_capacity_count, setuser_capacity_count] = useState([
    { name: 'Team', value: 0 },
    { name: 'Workflow', value: 0 },
    { name: 'User', value: 0, max: 0 },
    { name: 'Module', value: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const asset_data = [
    { key: 'inspections_size', name: 'Inspection Data', color: '#5397FE' },
    { key: 'site_reports_size', name: 'Report Data', color: '#FFBA0A' },
    { key: '3d_size', name: '3D Data', color: '#35CC57' },
    // { key: '3d_size', name: '360 Data', color: '#CC35A9' },
    { key: 'orthophotos_size', name: '2D Data', color: '#F5533D' },
  ];
  const getOrganizationDetail = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getOrganization(id),
      onSuccess: ({ data }) => {
        setorganization_detail(data);
        setstorage_capacity_count([
          { key: 'asset', name: 'Asset', value: data.assets.length, max: data['StoreStorage.asset_limit'] },
          { key: '3d', name: '3D', value: data.latest_count_summary['3d'].length },
          { key: 'orthophotos', name: '2D', value: data.latest_count_summary.orthophotos.length },
          { key: 'inspections', name: 'Inspection', value: data.latest_count_summary.inspections.length },
          { key: 'site-reports', name: 'Report', value: data.latest_count_summary['site-reports'].length },
        ]);
        setstorage_capacity_count([
          { key: 'asset', name: 'Asset', value: data.assets.length, max: data['StoreStorage.asset_limit'] },
          { key: '3d', name: '3D', value: data.latest_count_summary['3d'].length },
          { key: 'orthophotos', name: '2D', value: data.latest_count_summary.orthophotos.length },
          { key: 'inspections', name: 'Inspection', value: data.latest_count_summary.inspections.length },
          { key: 'site-reports', name: 'Report', value: data.latest_count_summary['site-reports'].length },
        ]);
        setuser_capacity_count([
          { name: 'Team', value: data.usercap_count_summary.teams.length },
          { name: 'Workflow', value: data.usercap_count_summary.workflows.length },
          { name: 'User', value: data.usercap_count_summary.users.length, max: data['StoreStorage.user_limit'] },
          { name: 'Module', value: data.usercap_count_summary.modules.length },
        ])
        setIsLoading(false);
      },
      onFail: () => toast('error', 'Error getting organizations. Please try again later.'),
    });
  };
  useEffect(() => {
    getOrganizationDetail();
  }, []);
  const onDownloadOrganizationReport = () => {
    Api({
      endpoint: endpoints.getOrganizationReport(id),
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileName: `Organization-${id}-${moment().format('YYYY-MM-DD')}.xlsx`,
    });
  };
  return {
    id,
    user_capacity_count,
    storage_capacity_count,
    asset_data: asset_data.map(asset => ({
      ...asset,
      size: organization_detail?.latest_size_summary?.[asset.key],
    })).sort((a, b) => { return b.size - a.size; }),
    organization_detail,
    onDownloadOrganizationReport,
  };
}

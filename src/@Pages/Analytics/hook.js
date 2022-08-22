import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook(hookfor) {
  const [compliancesBySite, setCompliancesBySite] = useState([]);
  const [compliancesByCategory, setCompliancesByCategory] = useState([]);
  const [qlassicBySite, setQlassicBySite] = useState([]);
  const [projects, set_projects] = useState([]);
  const [openContractorDialog, setOpenContractorDialog] = useState(false);
  // const getQlassicData = () => {
  //   Api({
  //     endpoint: endpoints.getPreqlassicSummary(),
  //     onSuccess: ({ data }) => {
  //       const mutateData = data.map(eachQlassic => ({
  //         ...eachQlassic,
  //         items: eachQlassic.items.map(eachSite => ({
  //           ...eachSite,
  //           image: eachSite['Project.Division.image'],
  //           name: eachSite['Project.name'],
  //           division_name: eachSite['Project.Division.name'],
  //         })),
  //       }));
  //       setQlassicBySite(mutateData);
  //     },
  //     onFail: setQlassicBySite([]),
  //   });
  // };
  const getSidebar = (InspectionCategoryId) => {
    Api({
      endpoint: endpoints.getCompliances(),
      data: { filterOnly: 'osh', compliance_by: 'project', InspectionCategoryId },
      onSuccess: (response) => setCompliancesBySite(response.data),
      onFail: setCompliancesBySite([]),
    });
    Api({
      endpoint: endpoints.getCompliances(),
      data: { filterOnly: 'osh', compliance_by: 'category', InspectionCategoryId },
      onSuccess: (response) => setCompliancesByCategory(response.data),
      onFail: setCompliancesByCategory([]),
    });
  };
  useEffect(() => {
    console.log('vvv', hookfor);
    // if (hookfor === 'quality') getQlassicData();
    if (hookfor === 'osh') getSidebar(1);
    if (hookfor === 'analytic') {
      Api({
        endpoint: endpoints.getAssets(),
        onSuccess: ({ data }) => { set_projects(data); },
        onFail: (err) => { toast('error', err); },
      });
    }
  }, []);
  return {
    projects,
    compliancesBySite,
    compliancesByCategory,
    qlassicBySite,
    openContractorDialog,
    setOpenContractorDialog,
  };
}

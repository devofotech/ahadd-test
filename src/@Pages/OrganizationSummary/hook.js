import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook() {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrganization = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getOrganizations(),
      onSuccess: ({ data }) => {
        setOrganizations(data);
        setIsLoading(false);
      },
      onFail: () => toast('error', 'Error getting organizations. Please try again later.'),
    });
  };

  useEffect(() => {
    getOrganization();
  }, []);

  return {
    organizations,
    isLoading,
  };
}

import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import { useHistory } from 'react-router-dom';

export default function Hook() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [workflows, setWorkflows] = useState([]);
  const [isUpdated, isUpdating] = useState(0);
  useEffect(() => {
    getWorkflows();
  }, [isUpdated]);
  const getWorkflows = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getWorkflows(),
      onSuccess: ({ data }) => { setWorkflows(data); setIsLoading(false); },
      onFail: () => toast('error', 'Error getting workflows data. Please try again later.'),
    });
  };
  const createWorkflow = (input) => {
    Api({
      endpoint: endpoints.newWorkflow(),
      data: input,
      onSuccess: ({ data }) => {
        isUpdating(prev => prev += 1);
        history.push(`workflow/${data.id}`);
      },
      onFail: () => toast('error', 'Error creating workflow. Please try again later.'),
    });
  };
  return {
    workflows,
    createWorkflow,
    isLoading,
  };
}

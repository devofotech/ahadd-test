import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionIsActive, setsubscriptionIsActive] = useState(true);
  const [usageExceedFreePlan, setusageExceedFreePlan] = useState(false);

  const terminateSubscription = () => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.endPlan(),
      onSuccess: ({ data }) => {
        setIsLoading(false);
        setsubscriptionIsActive(false);
      },
      onFail: (response) => console.log('lol'),
    });
  };
  useEffect(() => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.getOrganization(props.user?.OrganizationId),
      onSuccess: ({ data }) => {
        console.log('vvv cc', data);
        setIsLoading(false);
        // todo check for subscription active here
        if (data.Organization.AssetCount > data.Organization.AssetLimit) setusageExceedFreePlan(true);
        if (data.Organization.UserCount > data.Organization.UserLimit) setusageExceedFreePlan(true);
        // todo if storage caps setusageExceedFreePlan
      },
      onFail: (response) => console.log('lol'),
    });
  }, []);
  return {
    isLoading,
    terminateSubscription,
    subscriptionIsActive,
    usageExceedFreePlan,
  };
};

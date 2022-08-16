import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';

export default function Hook({ token }) {
  const [wallet, setWallet] = useState(0);
  const [refreshBalance, setRefreshBalance] = useState(0);

  const getWallet = () => {
    Api({
      endpoint: endpoints.getWallet(),
      token,
      onSuccess: (response) => {
        console.log('vvv h wallet latest', wallet, response.data[0].balance);
        if (wallet != response.data[0].balance) setWallet(response.data[0].balance);
      },
      onFail: () => console.log('fail to get balance'),
    });
  };

  // useEffect(() => {
  //   if (token) {
  //     console.log('vvv h checking balance interval registered');
  //     const interval = setInterval(() => {
  //       setRefreshBalance(pv => pv + 1);
  //       console.log('checking balance');
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [token]);

  useEffect(() => {
    if (token) getWallet();
  }, [refreshBalance]);

  return {
    wallet,
  };
}

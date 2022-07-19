import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { removeCookie } from '@Helpers/authUtils';

export default ({ setUser = () => null }) => {
  useEffect(() => {
    async function logout() {
      try {
        await removeCookie();
        setUser('logged out');
      } catch (e) {
        console.log('error remove cookie', e);
      }
    }
    logout();
  }, []);
  return <Redirect to="/login" />;
};

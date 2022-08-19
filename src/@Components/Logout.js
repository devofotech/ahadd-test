import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { removeCookie } from '@Helpers/authUtils';

export default ({ user, setUser = () => null }) => {
  if (user === 'logged out') {
    return <Redirect to="/login" />;
  }
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
  return <Redirect to="/logout" />;
};

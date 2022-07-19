import React, { createContext } from 'react';
import { getTokenCookie, getUserFromCookie } from '@Helpers/authUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = getTokenCookie();
  const user = getUserFromCookie();
  return <AuthContext.Provider value={{ user, token }}>{children}</AuthContext.Provider>;
};

import { Cookies } from 'react-cookie';

/**
 * Returns the logged in user
 */
export const getUserFromCookie = () => {
  const cookies = new Cookies();
  const user = cookies.get('user');
  if (!user) return null;

  return typeof user === 'object' ? user : JSON.parse(user);
};

export const setCookies = (key, value) => {
  (new Cookies()).set(key, JSON.stringify(value), { path: '/' });
  return true;
};
export const getTokenCookie = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  if (!token) return null;
  return token;
};

export const removeCookie = () => {
  const cookies = new Cookies();
  cookies.remove('user');
  cookies.remove('token');
  return null;
};

export const isEmailValid = (email) => {
  const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/;
  return emailRegex.test(email);
};

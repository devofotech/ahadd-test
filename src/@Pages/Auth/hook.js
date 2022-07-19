import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Api, { endpoints } from '@Helpers/api';
import queryString from 'query-string';

export default (props) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    props.setLoginError();
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') attemptLoginOrPasswordReset();
  };

  const attemptLoginOrPasswordReset = () => {
    if (!email) return props.setLoginError('Email required');
    if (!isForgotPassword) return props.login({ email, password });
    props.setIsLoading(true);
    Api({
      endpoint: endpoints.requestTokenToResetPassword(),
      data: { email, redirect_url: `${window.location.origin}/reset-password` },
      onSuccess: () => {
        props.setIsLoading(false);
        toast('success', 'Reset password successful. Please check your email to proceed');
        setIsForgotPassword(false);
      },
      onFail: () => {
        props.setIsLoading(false);
        toast('error', 'Failed to reset password');
      },
    });
  };

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (!code) return;
    props.ssologin({ code });
  }, []);

  return {
    onKeyDown,
    attemptLoginOrPasswordReset,
    toggleForgotPassword,
    from,
    email,
    setEmail,
    password,
    setPassword,
    isForgotPassword,
    setIsForgotPassword,
    location,
  };
};

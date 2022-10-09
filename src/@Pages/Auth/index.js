import React from 'react';
import useHook from './hook';
import LandingPageAhadd from './LandingPageAhadd';

export default function AuthPage(props) {
  const h = useHook(props);
  return (
    <LandingPageAhadd {...props} {...h} />
  );
}

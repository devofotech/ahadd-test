import React from 'react';
import UnsubscribeImage from '@Assets/Images/unsubscribe-1.svg';
import MainContentContainer from '@Components/MainContentContainer';
import Button from '@Components/Button';
import { Link } from 'react-router-dom';
import useHook from './hook';

export default function index(props) {
  const h = useHook(props);
  console.log('vvv h', h);
  return (
    <MainContentContainer>
      <div className="d-flex justify-content-center my-2">
        <img src={UnsubscribeImage} style={{ height: '55vh' }} />
      </div>
      <h3 style={{ fontSize: 20, color: '#8B95AB', textAlign: 'center' }}>
        {!!h.subscriptionIsActive ? 'Unsubscribe Storage Plan' : 'You have unsubscribed to our services'}

      </h3>
      <h1 style={{
        fontSize: 16, color: '#8B95AB', textAlign: 'center', marginTop: 20,
      }}
      >
        {!!h.subscriptionIsActive ? (
          <>
            You will be using Free Plan after unsubscribing. <br />
            {!!h.usageExceedFreePlan && (
              <>WARNING: Asset and data currently more than quota provided on Free Plan will be <strong>deleted permanently</strong>.</>
            )}
          </>
        ) : <>We are sad to see you go</>}
      </h1>
      <h1 style={{ fontSize: 16, color: '#8B95AB', textAlign: 'center' }}>
        You may subscribe to our services again via your profile
      </h1>
      {!!h.subscriptionIsActive ? (
        <>
          <div className="d-flex align-items-center justify-content-center my-5">
            <Link to="/profile-page">
              <Button size="small">&nbsp;&nbsp;NO&nbsp;&nbsp;</Button>
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-center my-5">
            <Button size="small" variant="text" onClick={() => h.terminateSubscription()}>&nbsp;&nbsp;UNSUBSCRIBE&nbsp;&nbsp;</Button>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center my-5">
          <Link to="/profile-page">
            <Button size="small">&nbsp;&nbsp;RETURN TO PROFILE&nbsp;&nbsp;</Button>
          </Link>
        </div>
      )}
    </MainContentContainer>
  );
}

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function TawktoWidget({ user }) {
  const location = useLocation();
  window.Tawk_API = window.Tawk_API || {};
  const tawkMessengerRef = useRef();
  const refHide = useRef(null);
  const refShow = useRef(null);
  const showCustomerSupport = !!user?.['Organization.StoreStorage.isCustomerSupport'];
  const onShow = () => (!_.isEmpty(window.Tawk_API) ? window.Tawk_API.showWidget() : window.Tawk_API);
  const onHide = () => (!_.isEmpty(window.Tawk_API) ? window.Tawk_API.hideWidget() : window.Tawk_API);

  useEffect(() => {
    setTimeout(showCustomerSupport ? onShow : onHide, 200);
  }, [user]);

  const onLoad = () => {
    if (showCustomerSupport) return window.Tawk_API.showWidget();
    return window.Tawk_API.hideWidget();
  };

  const onChatStarted = () => {
    if (!user) return;
    const user_info = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      raiseRole: user.raise_role,
      organizationName: user['Organization.name'],
      StoragePlan: user['Organization.StoreStorage.name'],
      location: location.pathname,
    };
    window.Tawk_API.addEvent('User-Info', user_info, (error) => { if (error) console.log('aaa-error', error); });
  };

  return (
    <>
      <button ref={showCustomerSupport ? refShow : refHide} onClick={showCustomerSupport ? onShow : onHide} style={{ opacity: 0 }} />
      <TawkMessengerReact
        propertyId={process.env.REACT_APP_TAWK_TO_PROPERTY_ID}
        widgetId={process.env.REACT_APP_TAWK_TO_TASK_ID}
        useRef={tawkMessengerRef}
        onChatStarted={onChatStarted}
        onLoad={onLoad}
      />
    </>
  );
}

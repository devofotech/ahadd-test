/* eslint-disable complexity */
import { useEffect, useState } from 'react';
import Api, { endpoints } from '@Helpers/api';
import {
  getUserFromCookie, getTokenCookie, setCookies, removeCookie,
} from '@Helpers/authUtils';
import { db } from '@Configs/firebase';
import { ref, onChildAdded } from 'firebase/database';
import moment from 'moment';

const kml = [{
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/PIZZA.kml',
  type: 'kml',
  name: 'PIZZA HUT',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/COMMERCIAL_PROPERTY.kml',
  type: 'kml',
  name: 'COMMERCIAL PROPERTY',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/JLAND_COMMERCIAL_PROPERTY.kml',
  type: 'kml',
  name: 'JLand Commercial Property',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/JLAND_RESIDENTIAL_PROPERTY.kml',
  type: 'kml',
  name: 'JLand Residential Property',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/AYAMAS.kml',
  type: 'kml',
  name: 'Restaurant: Ayamas',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/KPJ.kml',
  type: 'kml',
  name: 'KPJ Hospital',
}, {
  url: 'https://raw.githubusercontent.com/devofotech/dasb-kml/main/KFC.kml',
  type: 'kml',
  name: 'Restaurant: KFC',
}];

export default function Hook() {
  const tokenCookie = getTokenCookie();
  const userCookie = getUserFromCookie();
  const [token, setToken] = useState(tokenCookie);
  const [user, setUser] = useState(userCookie);
  const [refreshProfile, setRefreshProfile] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isMap, setIsMap] = useState(false);
  const [openDemoTour, setOpenDemoTour] = useState(false);

  const login = ({ email, password }) => {
    setIsLoading(true);
    setLoginError('');
    Api({
      endpoint: endpoints.getToken(),
      data: { email, password },
      onSuccess: (response) => {
        setToken(response.token);
        setCookies('token', response.token);
        setIsLoading(false);
      },
      onFail: (err) => {
        setToken();
        removeCookie();
        setIsLoading(false);
        setLoginError(err);
      },
    });
  };
  const ssologin = ({ code, loginDone = () => null }) => {
    setIsLoading(true);
    setLoginError('');
    Api({
      endpoint: endpoints.ssoCallback('microsoft'),
      data: { code, redirect_url: `${window.location.origin}/login` },
      onSuccess: (response) => {
        setToken(response.token);
        setCookies('token', response.token);
        setIsLoading(false);
      },
      onFail: (err) => {
        setToken();
        removeCookie();
        setIsLoading(false);
        setLoginError(err);
        loginDone();
        window.location = '/login';
      },
    });
  };

  const getUser = () => {
    Api({
      endpoint: endpoints.getProfile(),
      token,
      onSuccess: (response) => {
        setUser(response.data);
        setCookies('user', response.data);
      },
      onFail: setUser(),
    });
  };
  useEffect(async () => {
    const now = moment();
    const notificationsRef = ref(db, 'notifications');
    if (!user) return;
    const asset_access = user.AssetAccesses?.map(x => x.id);
    onChildAdded(notificationsRef, (data) => {
      if (data.val()?.user?.id && data.val()?.user?.id !== user.id) return;
      if (data.val()?.user?.OrganizationId && data.val()?.user?.OrganizationId !== user.OrganizationId) return;
      if (data.val()?.AssetId && !asset_access?.includes(Number(data.val()?.AssetId))) return;
      let descriptions = '';
      if (data.val()?.user?.name) descriptions += `${data.val()?.user?.name} `;
      if (data.val()?.description) descriptions += `${data.val()?.description} `;
      if (data.val()?.asset?.name) descriptions += `for ${data.val()?.asset?.name} `;
      if (moment(data.val()?.createdAt).utcOffset('+00:00').isAfter(now)) toast('warning', descriptions);
    });
  }, [user]);
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, refreshProfile]);

  return {
    ssologin,
    login,
    loginError,
    token,
    user,
    setUser,
    layers: kml,
    isLoading,
    setIsLoading,
    setLoginError,
    setRefreshProfile,
    isMap,
    setIsMap,
    getUser,
    openDemoTour,
    setOpenDemoTour,
  };
}

import { tokenFormatter } from '@Helpers';
import { AllInclusive } from '@material-ui/icons';
import tokenIcon from '@Assets/Images/RaiseToken-shadow.png';
import React, { useContext } from 'react';
import { AuthContext } from '@Context/Auth';
import useHook from './hook';

export default function CoinWallet({ isOrgUnlimited = false, valueOnly = false }) {
  const { token } = useContext(AuthContext);
  const h = useHook({ token });
  if (!!valueOnly) return tokenFormatter(h.wallet);
  return (
    <div className="d-flex align-items-center">
      <img src={tokenIcon} height={25} width={25} />&nbsp;
      <h3 className="text-center navbar-text" style={{ color: '#FEB019', fontSize: 15 }}>
        {isOrgUnlimited
          ? (<AllInclusive style={{ color: '#FEB019', width: 25 }} />)
          : tokenFormatter(h.wallet)}
      </h3>
    </div>
  );
}

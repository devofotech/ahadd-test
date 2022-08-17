import { Button } from 'reactstrap';
import microsoftIcon from '@Assets/Icons/microsoftIcon.svg';

export default function LoginForm() {
  const loginUrl = `${window.location.origin}/login`;
  return (
    <div className="my-5">
      <Button
        className="btn-block mx-auto"
        style={{ backgroundColor: '#fff', borderRadius: '5px' }}
        onClick={() => window.location.replace(`${process.env.REACT_APP_ENDPOINT_URL}auth/microsoft?redirect_url=${loginUrl}`)}
        children={(
          <div className="d-flex" style={{ justifyContent: 'space-evenly', color: '#5B6272', fontWeight: 600 }}>
            <img src={microsoftIcon} width={25} />
            SIGN IN VIA MICROSOFT
          </div>
        )}
      />
    </div>
  );
}

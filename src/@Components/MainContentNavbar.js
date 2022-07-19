import { KeyboardArrowLeft } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { primaryColor } from '@Assets/css/index';

function MainContentNavbar(props) {
  const history = useHistory();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      {props.to ? (
        <Link to={props.to}>
          <KeyboardArrowLeft
            style={{
              color: '#FFFFFF',
              fontSize: 30,
              background: primaryColor,
              padding: '6px 1px',
              borderRadius: 10,
            }}
          />
        </Link>
      ) : (
        <KeyboardArrowLeft
          style={{
            color: '#FFFFFF',
            fontSize: 30,
            background: primaryColor,
            padding: '6px 1px',
            borderRadius: 10,
            cursor: 'pointer',
          }}
          onClick={() => history.goBack()}
        />
      )}
      <h1 style={{ marginLeft: 10 }} className="color-primary">{props.text}</h1>
      {props.upload && <div style={{ marginLeft: 'auto' }}>{props.upload}</div>}
    </div>
  );
}

export default MainContentNavbar;

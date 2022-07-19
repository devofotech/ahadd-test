import { Link, useRouteMatch } from 'react-router-dom';

export default function Navbar() {
  const { path } = useRouteMatch();
  return (
    <div
      className="flex-standard"
      style={{
        background: 'rgba(255,255,255,0.65)',
        marginBottom: 10,
      }}
    >
      <Link to="/dashboard/analytic">
        <h3 style={{ margin: '0 30px', opacity: path === '/dashboard/analytic' ? 1 : 0.65 }}>Analytics</h3>
      </Link>
    </div>
  );
}

import { Switch, Route } from 'react-router-dom';
import Analytic from './Analytic';
import Navbar from './Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Switch>
        {[
          {
            path: '/dashboard/analytic',
            children: <Analytic />,
            exact: true,
          },
        ].map(e => (
          <Route {...e} />
        ))}
      </Switch>
    </>
  );
}

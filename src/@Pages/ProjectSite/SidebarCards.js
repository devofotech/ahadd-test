import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

export default (props) => {
  const arr = [];
  arr.push({ title: 'OSH', to: '/project/osh' });
  // if (props.user.can_see_osh) arr.push({ title: 'OSH', to: '/project/osh' });
  // if (props.user.can_see_project_progres) arr.push({ title: 'ProjectProgress', to: '/project/progress' });

  return (
    arr.map(e => (
      <Grid xs={12} lg={12 / arr.length} item>
        <SidebarCard {...e} />
      </Grid>
    ))
  );
};

function SidebarCard(props) {
  const cardStyling = props.disabled ? {
    background: '#D9DADC',
    opacity: '0.4',
    cursor: 'default',
  } : {
    background: '#F5FAFF',
  };
  return (
    <Link to={props.to}>
      <div
        className="flex-standard py-3 px-2"
        style={{
          margin: 5, borderRadius: 10, ...cardStyling,
        }}
      >
        <h5>{props.title}</h5>
      </div>
    </Link>
  );
}

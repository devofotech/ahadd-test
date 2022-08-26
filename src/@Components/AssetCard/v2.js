/* eslint-disable complexity */
import React, { useState } from 'react';
import {
  Card, Grid, Typography, CardActionArea, CardMedia, CardContent, Tooltip, Button, Avatar,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { makeStyles, styled } from '@material-ui/core/styles';
import { RankingAhaddIcon } from '@Assets/Icons/RankingAhaddIcon';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: { maxWidth: '100%', margin: '0 2px', minHeight: '100%' },
  media: { height: '30vh' },
  title: { fontWeight: 'bold', fontSize: 20, color: 'var(--dark-blue-color)', fontFamily: 'CeraProRegular' },
  content: { color: '#707070', fontSize: 12, fontFamily: 'CeraProRegular' },
  deleteButtonContent: { right: 15, top: '30%' },
  avatarContent: { right: 10, top: '20%' },
  deleteButton: { color: '#FF1E1E' },
  editButtonContent: { position: 'absolute', right: 11, top: 11 },
  editButton: {
    color: '#045C5C', backgroundColor: '#FFFFFF', borderRadius: '50%', padding: 2,
  },
});

export default function AssetCard({
  data: projects, setSelectedAsset, setOpen, userData, setOpenRelative,
  setWorkflowAccess, setTeamAccess, setUserAccess, ...h
}) {
  const history = useHistory();
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const project_img = `${process.env.REACT_APP_S3}/${!!projects?.image ? projects.image : 'static/media/defaultAssetImg-01.png'}`;
  const assetWorkflowAccess = projects.AssetAccesses.filter(acc => !!acc.Workflow).map(acc => ({ ...acc.Workflow, type: 'Workflow' }));
  const assetTeamAccess = projects.AssetAccesses.filter(acc => !!acc.Team).map(acc => ({ ...acc.Team, type: 'Team' }));
  const assetUserAccess = projects.AssetAccesses.filter(acc => !!acc.User).map(acc => acc.User);
  const region = h.regions.find(f => f.value === projects.RegionId)?.label;
  const network = h.networks.find(f => f.value === projects.NetworkId)?.label;
  const section = h.sections.find(f => f.value === projects.SectionId)?.label;
  const [onIconHover, setOnIconHover] = useState({});
  const [onHover, setOnHover] = useState(false);
  return (
    <Grid item xs={6} sm={4} md={3} lg={3} className="mt-2 position-relative" key={projects?.id}>
      <>
        <div
          className="position-absolute"
          onMouseOver={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          onFocus={() => setOnHover(true)}
          style={{
            position: 'absolute',
            zIndex: 99,
            top: 10,
            left: 10,
            transform: onHover ? 'scale(0.94)' : 'scale(0.8)',
            transition: 'all .5s',
          }}
        >
          <RankingAhaddIcon type="unrank" />
        </div>
      </>
      <Card
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={classes.root}
        style={{ transform: onHover ? 'scale(1.01)' : 'scale(1)', transition: 'all .5s' }}
      >
        <CardActionArea>
          <Link to={`/project?id=${projects?.id}`}>
            <CardMedia className={classes.media} image={project_img} />
          </Link>
          {userData?.can_edit_asset && (
            <Grid item className={classes.editButtonContent}>
              <Button
                onClick={() => {
                  MySwal.fire({
                    title: 'Please choose the action that you want',
                    showCancelButton: true,
                    showDenyButton: true,
                    showConfirmButton: true,
                    denyButtonText: 'Delete Asset',
                    confirmButtonText: 'View / Edit Asset',
                    confirmButtonColor: 'var(--primary-color)',
                    cancelButtonText: 'Do Nothing',
                  }).then((result) => {
                    if (result.isConfirmed) history.push(`/asset/${projects?.id}`);
                    if (result.isDenied) {
                      setSelectedAsset(projects);
                      setOpen(true);
                    }
                  });
                }}
              >
                <h3 className="text-white mr-1 h-25" style={{ fontSize: 16 }}>• • •</h3>
              </Button>
            </Grid>
          )}
          <CardContent className="position-relative p-0">
            <Link to={`/project?id=${projects?.id}`}>
              <div style={{ padding: 16 }}>
                <Typography gutterBottom className={classes.title}>{projects?.name}</Typography>
                <Typography component="p" className={classes.content}>
                  {`${!!region ? `${region},` : ''} ${network}${!!section ? `, ${section}` : ''}`}
                  <br />
                  {`Last Update on ${moment(projects?.updatedAt).format('D MMMM YYYY, hh:mm A')}`}
                </Typography>
              </div>
            </Link>
            <div
              className={`position-absolute flex-standard float-right ${classes.avatarContent}`}
              onClick={() => (
                setOpenRelative(true),
                setSelectedAsset(projects),
                setWorkflowAccess(assetWorkflowAccess),
                setUserAccess(assetUserAccess),
                setTeamAccess(assetTeamAccess)
              )}
            >
              {[1, 2].includes(userData?.RoleId) && (
                <AvatarGroupIcon max={3}>
                  {[...assetWorkflowAccess, ...assetTeamAccess, ...assetUserAccess]?.map((u, index) => (
                    <Tooltip title={u.name}>
                      <Avatar
                        onMouseEnter={() => setOnIconHover({ [index]: !onIconHover[index] })}
                        onMouseLeave={() => setOnIconHover({ [index]: !!onIconHover[index] })}
                        style={{
                          backgroundColor: u.type === 'Team' ? `#${u.colour}` : u.type === 'Workflow' ? u.colour : '#506288',
                          borderRadius: u.type === 'Workflow' && '8px',
                          zIndex: onIconHover[index] ? 999 : !index ? 10 : 1,
                        }}
                        alt={u.name}
                        src={`${process.env.REACT_APP_S3}/${u?.image}`}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroupIcon>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
const AvatarGroupIcon = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    height: '22px',
    width: '22px',
    fontSize: 12,
    backgroundColor: '#506288',
    '&:hover': {
      zIndex: '999 !important',
    },
  },
});

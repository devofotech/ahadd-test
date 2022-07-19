import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chip, Card, CardContent, Collapse, Typography, IconButton, Grid, Tooltip,
} from '@material-ui/core';
import { ExpandMore, ExpandLess, PermIdentity } from '@material-ui/icons';
import AvatarIcon from '@Components/AvatarIcon';
import UserUpdateDialog from './UserUpdateDialog';
import DeleteUserDialog from './DeleteUserDialog';

export default ({
  user, pageAccessList, assetAccessList, roles, getUsers, team,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState([]);

  const selectedPage = [];

  user.page_access?.split(',').forEach(pa => selectedPage.push(pageAccessList[pa]));

  useEffect(() => {
    if (!user.AssetAccess.length) return;
    if (!Object.keys(assetAccessList).length) return;
    const filteredAsset = user.AssetAccess?.map(aa => assetAccessList[aa.AssetId] ?? null).filter(a => !!a);
    setSelectedAsset(filteredAsset);
  }, [user.AssetAccess, assetAccessList]);

  const handleExpandClick = () => setExpanded(p => !p);
  const ExpandIcon = !expanded ? ExpandMore : ExpandLess;

  const AvatarTeam = (data) => {
    if (!data.id) {
      return (
        <p className="text-center" style={{ fontSize: 12 }}>Not<br />Assigned</p>
      );
    }
    return (
      <AvatarIcon
        user={data}
        size="1.5rem"
        fontSize="9px"
        colorType="inherit"
        backgroundColor={`#${data.colour}`}
        style={{ marginLeft: '0.8rem', color: !data.colour ? 'black' : 'white', cursor: 'default' }}
      />
    );
  };

  return (
    <Card className="bg-white mb-3">
      <CardContent className="py-0">
        <Grid container>
          {[
            {
              xs: 3,
              children: (
                <>
                  <AvatarIcon
                    user={user}
                    size="2rem"
                    fontSize="14px"
                    colorType="inherit"
                    backgroundColor="rgb(80, 98, 136)"
                    style={{ outline: '1px solid var(--primary-color)' }}
                  />
                  <Typography
                    className="ml-2 text-capitalize"
                    variant="h6"
                    style={{ fontSize: 18, fontFamily: 'CeraProRegular', fontWeight: 600 }}
                  >
                    {user?.name}
                  </Typography>
                </>
              ),
            },
            { xs: 3, children: <p>{user?.email}</p> },
            { xs: 1, children: <div className="flex-standard"><AvatarTeam {...team[0]} /></div> },
            { xs: 1, children: <p className="text-capitalize">{roles[user?.RoleId]}</p> },
            { xs: 1, children: <p className="text-capitalize">{user?.raise_role?.replace(/_+/g, ' ')}</p> },
            { xs: 2, children: <ButtonList user={user} refresh={getUsers} />, className: 'flex-standard' },
            {
              xs: 1,
              children: <IconButton onClick={handleExpandClick}><ExpandIcon className="color-primary" /></IconButton>,
              className: 'flex-standard',
            },
          ].map(e => <Grid container {...e} className={!!e.className ? e.className : 'd-flex align-items-center'} />)}
        </Grid>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            {
              [{ title: 'Page Access', access: selectedPage }, { title: 'Asset Access', access: selectedAsset }]
                .map((m, idx) => <AccessContainer {...m} idx={idx} />)
            }
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const AccessContainer = ({ title, access, idx }) => (
  <>
    <Grid container xs={4} />
    <Grid item xs={8}>
      <p className={`color-primary mb-2 ${!!idx && 'mt-3'}`}>{title}</p>
      {access.length
        ? access.map(label => <CustomChip label={label} />)
        : <CustomChip label="None" />}
    </Grid>
  </>
);

const CustomChip = (data) => (
  <Chip
    label={data.label}
    size="small"
    className="mr-1 mb-1 text-capitalize text-white"
    style={{
      backgroundColor: 'var(--primary-color)',
    }}
  />
);

const ButtonList = ({ user, refresh }) => {
  return (
    <>
      <UserUpdateDialog user={user} refresh={refresh} />
      <DeleteUserDialog user={user} refresh={refresh} />
      <Link to={`/user/${user?.id}`}>
        <Tooltip title="Profile Page">
          <IconButton>
            <PermIdentity />
          </IconButton>
        </Tooltip>
      </Link>
    </>
  );
};

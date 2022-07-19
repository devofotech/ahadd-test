/* eslint-disable complexity */
import React, { useState } from 'react';
import {
  Box, Grid, Paper, Button, makeStyles, Typography,
} from '@material-ui/core';
import _ from 'lodash';
import mapping_2d from '@Assets/Images/mapping_2d.png';

export default function IssueDisplay({
  assetType, index, hasAccess = true, isDisabled = true, ...props
}) {
  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);
  const DisabledOverlay = () => (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        zIndex: 3,
        width: '100%',
        height: '100%',
      }}
    />
  );
  const assetImage = !!assetType?.image ? `${process.env.REACT_APP_S3}/${assetType?.image}` : mapping_2d;
  const sortedIssue = _.orderBy(props.originalIssue?.filter(f => f.name !== ''), ['sequence_id'], ['asc']);
  return (
    <Grid item xs={props.isEdit ? 4 : 3}>
      <Paper
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        style={{
          outline: (onHover && isDisabled) && '3px solid var(--primary-color)',
          borderRadius: '2px',
          transition: 'all .1s',
          height: '34rem',
          position: 'relative',
          cursor: 'default',
        }}
      >
        {!isDisabled && (<DisabledOverlay />)}
        <Box>
          <img
            className="card-img-top"
            src={assetImage}
            alt="alt__"
            height="200px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box className="mx-3">
          <Typography gutterBottom variant="h5" component="h2" className="mt-3 pb-2">
            {assetType?.name}
          </Typography>
          <Typography
            className="mt-4 mb-1 mx-1"
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ color: '#000', fontFamily: 'CeraProRegular', fontSize: '14px' }}
          >Default Inspection Status
          </Typography>
          {
            !!props.originalIssue ? (sortedIssue.map((m, idx) => (
              <Typography
                className="mt-2 mx-1 text-capitalize"
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ color: '#000', fontFamily: 'CeraProRegular', fontSize: '14px' }}
              >{`${idx + 1}. ${m.name}`}
              </Typography>
            ))) : (props.defaultIssueGroup.map((m, idx) => (
              <Typography
                className="mt-2 mx-1 text-capitalize"
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ color: '#000', fontFamily: 'CeraProRegular', fontSize: '14px' }}
              >{`${idx + 1}. ${m.name}`}
              </Typography>
            )))
          }
        </Box>
        {isDisabled
          ? (
            <>
              {hasAccess && (
                <Box
                  className={`mt-1 pt-2 ${onHover ? 'w-100 visible' : 'w-50 invisible'}`}
                  style={{
                    transition: 'all .20s',
                    position: 'absolute',
                    bottom: 0,
                  }}
                >
                  <Button
                    className={classes.button}
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: '#FFF',
                      fontWeight: 'bold',
                      height: '50px',
                    }}
                    onClick={() => { props.setSelectedAssetType(assetType.id); if (!!props.selectedAssetType) props.setSelectedAssetType(0); }}
                  >
                    {!props.selectedAssetType ? 'Edit Inspection Status' : 'Return to Previous Page'}
                  </Button>
                </Box>
              )}
            </>
          )
          : (
            <h2 className="my-4 text-center w-100 position-absolute" style={{ fontSize: 12, bottom: 0 }}>
              You do not own any asset of this type
            </h2>
          )}
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles({
  button: {
    borderRadius: '0 0 2px 2px !important',
    width: '100%',
  },
});

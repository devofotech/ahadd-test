import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

export default (props) => {
  const classes = useStyles();
  const handlePick = (e) => props.set_displayed_image(e);
  if (!props.footage.length) return <p>NO DATA</p>;
  return (
    <InfiniteScroll
      loadMore={props.onBottomVerticalSlider}
      // hasMore={!annotation.isLoading && !!annotation.data.next_page_url}
      loader={<></>}
      useWindow={false}
    >
      {props.footage.map((m) => (
        <Card className={classes.card}>
          <img
            src={`${process.env.REACT_APP_S3}/${m.path}`}
            alt="View of "
            className={classes.image}
            style={{ opacity: props.displayed_image?.path === m.path ? 1 : 0.5 }}
            onClick={() => handlePick(m)}
          />
        </Card>
      ))}

    </InfiniteScroll>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    marginBottom: '5px',
    cursor: 'pointer',
    backgroundColor: 'black',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    aspectRatio: '4/2',
  },
}));

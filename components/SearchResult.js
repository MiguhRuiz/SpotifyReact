/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import Link from 'next/link';

import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Hearing from 'material-ui/svg-icons/av/hearing';

const styles = {
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

function SearchResult(props) {
  let photo;
  if (props.type === 'album') {
    photo = (
      <div className={`${props.type}-image`}>
        <Link href={`/${props.type}?q=${props.id}`}>
          <img
            src={props.images[0].url}
            height="300"
            width="300"
            alt="Album"
          />
        </Link>
      </div>
    );
  } else if (props.type === 'track') {
    photo = (
      <div className={`${props.type}-image`}>
        <Link href={`/${props.type}?q=${props.id}`}>
          <img
            src="/static/tape_full.png"
            width="300"
            alt="Tape"
          />
        </Link>
      </div>
    );
  }

  return (
    <GridTile
      key={props.id}
      className={`${props.type}-${props.id}`}
      title={props.name}
      subtitle={`De: ${props.artists[0].name}`}
      actionIcon={<IconButton><Hearing color="rgb(0, 188, 212)" /></IconButton>}
      titleStyle={styles.titleStyle}
      titleBackground="linear-gradient(to top, rgba(0,0,0,0.7)
      0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    >
      { photo }
    </GridTile>
  );
}

SearchResult.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
  })),
  name: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};

export default SearchResult;

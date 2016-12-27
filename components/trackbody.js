/**
 * Created by miguhruiz on 27/12/16.
 */
import React, { PropTypes } from 'react';

const styles = {
  noLinks: {
    textDecoration: 'none',
  },
  separate: {
    marginBottom: '1em',
  },
  songName: {
    marginLeft: '1em',
  },
};

function TrackBody(props) {
  return (
    <a href={`/track?q=${props.id}`} style={styles.noLinks}>
      <li style={styles.separate}>
        {props.track_number}.<b style={styles.songName}>{props.name}</b>
      </li>
    </a>
  );
}

TrackBody.propTypes = {
  id: PropTypes.string,
  track_number: PropTypes.number,
  name: PropTypes.string,
};

export default TrackBody;

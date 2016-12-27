/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import TrackPage from '../components/pages/track.js';

import store from '../src/store';

function Track(props) {
  return (
    <Provider store={store}>
      <TrackPage id={props.url.query.q} />
    </Provider>
  );
}

Track.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.shape({
      q: PropTypes.string,
    }),
  }),
};

export default Track;

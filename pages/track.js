/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import TrackPage from '../components/pages/track.js';

import store from '../src/store';

class Track extends React.Component {
  static async getInitialProps({ query }) {
    return { query: query.q };
  }
  render() {
    return (
      <Provider store={store}>
        <TrackPage id={this.props.query} />
      </Provider>
    );
  }
}

Track.propTypes = {
  query: PropTypes.string,
};

export default Track;

/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import AlbumPage from '../components/pages/album.js';

import store from '../src/store';

class Album extends React.Component {
  static async getInitialProps({ query }) {
    return { query: query.q };
  }
  render() {
    return (
      <Provider store={store}>
        <AlbumPage id={this.props.query} />
      </Provider>
    );
  }
}

Album.propTypes = {
  query: PropTypes.string,
};

export default Album;

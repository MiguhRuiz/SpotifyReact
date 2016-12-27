/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import AlbumPage from '../components/pages/album.js';

import store from '../src/store';

function Album(props) {
  return (
    <Provider store={store}>
      <AlbumPage id={props.url.query.q} />
    </Provider>
  );
}

Album.propTypes = {
  url: PropTypes.shape({
    query: PropTypes.shape({
      q: PropTypes.string,
    }),
  }),
};

export default Album;

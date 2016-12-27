/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react';
import { Provider } from 'react-redux';

import HomePage from '../components/pages/home.js';

import store from '../src/store';

function HomeSearch() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default HomeSearch;

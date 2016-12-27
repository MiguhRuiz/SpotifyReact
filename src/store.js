/**
 * Created by miguhruiz on 25/12/16.
 */
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            createLogger(),
            thunk,
        ),
    ),
);

export default store;

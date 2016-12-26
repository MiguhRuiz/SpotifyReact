/**
 * Created by miguhruiz on 25/12/16.
 */
import { combineReducers } from 'redux-immutable'
import {
    fromJS,
    Map as map
} from 'immutable'

const initialState = fromJS({
    search: {},
    album: {},
    track: {}
})

function searchReducer(state = initialState.get('search'), action = {}) {
    switch (action.type) {
        case 'SET_SEARCH':
            return state.set('result', map(action.payload))
        default:
            return state
    }
}

function albumReducer(state = initialState.get('album'), action = {}) {
    switch (action.type) {
        case 'SET_ALBUM':
            return state.set(action.payload.id, map(action.payload))
        default:
            return state
    }
}

function trackReducer(state = initialState.get('track'), action = {}) {
    switch (action.type) {
        case 'SET_TRACK':
            return state.set(action.payload.id, map(action.payload))
        default:
            return state
    }
}

const reducer = combineReducers({
    search: searchReducer,
    album: albumReducer,
    track: trackReducer
})

export default reducer
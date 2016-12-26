/**
 * Created by miguhruiz on 25/12/16.
 */
import { combineReducers } from 'redux'

const initialState = {
    search: {},
    album: {},
    track: {}
}

function searchReducer(state = initialState.search, action = {}) {
    switch (action.type) {
        case 'SET_SEARCH':
            return action.payload
        default:
            return state
    }
}

function albumReducer(state = initialState.album, action = {}) {
    switch (action.type) {
        case 'SET_ALBUM':
            return state.concat(action.payload)
        default:
            return state
    }
}

function trackReducer(state = initialState.track, action = {}) {
    switch (action.type) {
        case 'SET_TRACK':
            return state.concat(action.payload)
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
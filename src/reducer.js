/**
 * Created by miguhruiz on 25/12/16.
 */
import { combineReducers } from 'redux-immutable';
import {
  fromJS,
  Map as map,
} from 'immutable';

const initialState = fromJS({
  search: {
    albums: {
      entities: {},
      total: 0,
    },
    tracks: {
      entities: {},
      total: 0,
    },
  },
  albumTracks: {},
  track: {},
});

function searchTotalAlbumReducer(state = initialState.get('search').get('albums').get('total'), action = {}) {
  switch (action.type) {
    case 'SET_ALBUM_SEARCH':
      return action.payload.albums.total;
    default:
      return state;
  }
}

function searchAlbumsReducer(state = initialState.get('search').get('albums').get('entities'), action = {}) {
  switch (action.type) {
    case 'SET_ALBUM_SEARCH':
      return action.payload.albums.items
        .reduce(
          (albums, album) => albums.set(album.id, map(album)),
          state,
        );
    default:
      return state;
  }
}

const searchAlbumReducer = combineReducers({
  total: searchTotalAlbumReducer,
  entities: searchAlbumsReducer,
});

function searchTotalTrackReducer(state = initialState.get('search').get('tracks').get('total'), action = {}) {
  switch (action.type) {
    case 'SET_TRACK_SEARCH':
      return action.payload.tracks.total;
    default:
      return state;
  }
}

function searchTracksReducer(state = initialState.get('search').get('tracks').get('entities'), action = {}) {
  switch (action.type) {
    case 'SET_TRACK_SEARCH':
      return action.payload.tracks.items
        .reduce(
          (tracks, track) => tracks.set(track.id, map(track)),
          state,
        );
    default:
      return state;
  }
}

const searchTrackReducer = combineReducers({
  total: searchTotalTrackReducer,
  entities: searchTracksReducer,
});

const searchReducer = combineReducers({
  albums: searchAlbumReducer,
  tracks: searchTrackReducer,
});

function albumTrackReducer(state = initialState.get('albumTracks'), action = {}) {
  switch (action.type) {
    case 'SET_ALBUM_TRACKS':
      return action.payload.items
        .reduce(
          (tracks, track) => tracks.set(track.id, map(track)),
          state,
        );
    default:
      return state;
  }
}

const reducer = combineReducers({
  search: searchReducer,
  albumTracks: albumTrackReducer,
});

export default reducer;

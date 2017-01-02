/**
 * Created by miguhruiz on 25/12/16.
 */
import api from '../lib/api';

function searchAlbum(result) {
  return {
    type: 'SET_ALBUM_SEARCH',
    payload: result,
  };
}

function searchTrack(result) {
  return {
    type: 'SET_TRACK_SEARCH',
    payload: result,
  };
}

function albumTracks(tracks) {
  return {
    type: 'SET_ALBUM_TRACKS',
    payload: tracks,
  };
}

function setSearchAlbum(query) {
  return async (dispatch) => {
    const result = await api.searchAlbum(query);
    dispatch(searchAlbum(result));

    return result;
  };
}

function setSearchTrack(query) {
  return async (dispatch) => {
    const result = await api.searchTrack(query);
    dispatch(searchTrack(result));

    return result;
  };
}

function setAlbumTracks(id) {
  return async (dispatch) => {
    const result = await api.getAlbumTracks(id);
    dispatch(albumTracks(result));

    return result;
  };
}

export default {
  searchAlbum,
  searchTrack,
  albumTracks,
  setSearchAlbum,
  setAlbumTracks,
  setSearchTrack,
};

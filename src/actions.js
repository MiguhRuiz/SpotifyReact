/**
 * Created by miguhruiz on 25/12/16.
 */
import api from '../lib/api';

function search(result) {
  return {
    type: 'SET_SEARCH',
    payload: result,
  };
}

function setAlbum(album) {
  return {
    type: 'SET_ALBUM',
    payload: album,
  };
}

function setTrack(track) {
  return {
    type: 'SET_TRACK',
    payload: track,
  };
}

function setSearch(query) {
  return async (dispatch) => {
    const result = await api.searchAlbum(query);
    dispatch(search(result));

    return result;
  };
}

function loadAlbum(id) {
  return async (dispatch) => {
    const album = await api.getAlbum(id);
    dispatch(setAlbum(album));

    return album;
  };
}

function loadTrack(id) {
  return async (dispatch) => {
    const track = await api.getTrack(id);
    dispatch(setTrack(track));

    return track;
  };
}

export default {
  search,
  setAlbum,
  setTrack,
  setSearch,
  loadAlbum,
  loadTrack,
};

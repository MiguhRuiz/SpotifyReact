/**
 * Created by miguhruiz on 23/12/16.
 */
import fetch from 'isomorphic-fetch';

const uri = 'https://api.spotify.com/v1';

class Api {
  async searchAlbum(query) {
    this.query = query;

    const q = query.split(' ').join('+');

    const result = await fetch(`${uri}/search?q=${q}&type=album`);
    const data = await result.json();

    return data;
  }
  async searchTrack(query) {
    this.query = query;

    const q = query.split(' ').join('+');

    const result = await fetch(`${uri}/search?q=${q}&type=track`);
    const data = await result.json();

    return data;
  }
  async getAlbumTracks(id) {
    this.id = id;

    const result = await fetch(`${uri}/albums/${id}/tracks`);
    const data = await result.json();

    return data;
  }
  async getTrack(id) {
    this.id = id;

    const result = await fetch(`${uri}/tracks/${id}`);
    const data = await result.json();

    return data;
  }

}

export default new Api();

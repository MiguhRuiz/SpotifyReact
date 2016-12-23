/**
 * Created by miguhruiz on 23/12/16.
 */
import fetch from 'isomorphic-fetch'

const uri = 'https://api.spotify.com/v1'

class Api {
    async searchAlbum(query) {
        const q = query.split(' ').join('+')

        const result = await fetch(`${uri}/search?q=${q}&type=album,track`)
        const data = await result.json()

        return data
    }
    async getAlbum(id) {
        const result = await fetch(`${uri}/albums/${id}`)
        const data = await result.json()

        return data
    }
    async getTrack(id) {
        const result = await fetch(`${uri}/tracks/${id}`)
        const data = await result.json()

        return data
    }

}

export default Api
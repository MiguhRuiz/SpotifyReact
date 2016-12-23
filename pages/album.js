/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import Link from 'next/link'

import Loading from '../components/loading'

import api from '../lib/api'

class Album extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            id: props.url.query.q,
            album: []
        }
    }
    async componentDidMount() {
        const album = await api.getAlbum(this.state.id)
        this.setState({
            loading: false,
            album
        })
    }
    render() {
        if(this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div className="Album">
                    <figure className="Album-cover">
                        <img src={this.state.album.images[0].url} alt="Album Cover"/>
                    </figure>
                    <div className="Album-details">
                        <h1>{this.state.album.name}</h1>
                        <span>Por: <b>{this.state.album.artists[0].name}</b></span>
                        <span>Popularidad: <b>{this.state.album.popularity}%</b></span>
                        <ul className="Album-tracks">
                            {
                                this.state.album.tracks.items.map(
                                    track => {
                                        return (
                                            <Link href={`/track?q=${track.id}`}>
                                                <li>
                                                    {track.track_number}.<b>{track.name}</b>
                                                </li>
                                            </Link>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default Album
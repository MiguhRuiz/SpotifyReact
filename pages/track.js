/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import ms from 'ms'
import Link from 'next/link'

import Loading from '../components/loading'

import api from '../lib/api'

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            id: props.url.query.q,
            track: []
        }
    }
    async componentDidMount() {
        const track = await api.getTrack(this.state.id)

        this.setState({
            loading: false,
            track
        })
    }
    render() {
        if(this.state.loading) {
            return <Loading />
        } else {
            return (
                <div className="Track">
                    <h1 className="Track-name">{this.state.track.name}</h1>
                    {
                        this.state.track.explicit && (
                            <b className="Track-explicit">EXPLICIT</b>
                        )
                    }
                    <audio
                        className="Track-preview"
                        controls='controls'
                        src={this.state.track.preview_url} />
                    <h2 className="Track-author">De: {this.state.track.artists[0].name}</h2>
                    <span className="Track-popularity">Popularidad: <b>{this.state.track.popularity}%</b></span>
                    <span className="Track-duration">Duración: <b>{ms(this.state.track.duration_ms, {long: true}).split(' ')[0]} minutos aproximadamente</b></span>
                    <h4 className="Track-extra">Canción nº {this.state.track.track_number} del álbum
                        <Link href={`/album?q=${this.state.track.album.id}`}>
                            {` ${this.state.track.album.name}`}
                        </Link>
                    </h4>
                </div>
            )
        }
    }
}

export default Track
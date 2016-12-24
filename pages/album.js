/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Material from 'material-ui/styles/MuiThemeProvider'

import Loading from '../components/loading'
import Header from '../components/header'
import { CardMedia, CardTitle } from 'material-ui/Card'

import api from '../lib/api'

const styles = {
    card: {
        width: '600px'
    },
    columns: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    noDecorationList: {
        listStyle: 'none'
    },
    noLinks: {
        textDecoration: 'none'
    },
    separate: {
        marginBottom: '1em'
    },
    songName: {
        marginLeft: '1em'
    }
}

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
                <Material>
                    <div className="Album">
                        <Head>
                            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
                        </Head>
                        <Header />
                        <div className="Album-all" style={styles.columns}>
                            <CardMedia
                                className="Album-cover"
                                overlay={<CardTitle title={this.state.album.name} subtitle={`Por ${this.state.album.artists[0].name}; Popularidad: ${this.state.album.popularity}%`}/>}
                                style={styles.card}
                            >
                                <img
                                    src={this.state.album.images[0].url}
                                    alt="Album Cover"/>
                            </CardMedia>
                            <div className="Album-details">
                                <ul className="Album-tracks" style={styles.noDecorationList}>
                                    <h2> Este álbum incluye...</h2>
                                    {
                                        this.state.album.tracks.items.map(
                                            track => {
                                                return (
                                                    <a href={`/track?q=${track.id}`} style={styles.noLinks}>
                                                        <li style={styles.separate}>
                                                            {track.track_number}.<b style={styles.songName}>{track.name}</b>
                                                        </li>
                                                    </a>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </Material>
            )
        }
    }
}

export default Album
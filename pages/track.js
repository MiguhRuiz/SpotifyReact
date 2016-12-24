/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import ms from 'ms'
import Link from 'next/link'
import Material from 'material-ui/styles/MuiThemeProvider'
import Head from 'next/head'

import Loading from '../components/loading'
import Header from '../components/header'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import api from '../lib/api'

const styles = {
    center: {
        display: 'block',
        margin: '0 auto'
    },
    textCenter: {
        textAlign: 'center'
    },
    separateChips: {
        marginRight: '1em'
    }
}

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
                <Material>
                    <div className="Track">
                        <Head>
                            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
                        </Head>
                        <Header />
                        <Paper zDepth="3">
                            <h1 className="Track-name" style={styles.textCenter}>{this.state.track.name}</h1>
                            {
                                this.state.track.explicit && (
                                    <b className="Track-explicit">EXPLICIT</b>
                                )
                            }
                            <div className="Track-extra" style={{display: 'flex', justifyContent: 'center', marginBottom: '1em'}}>
                                <Chip className="Track-author" style={styles.separateChips}>De: {this.state.track.artists[0].name}</Chip>
                                <Chip className="Track-popularity" style={styles.separateChips}>Popularidad: <b>{this.state.track.popularity}%</b></Chip>
                                <Chip className="Track-duration" style={styles.separateChips}><b>{ms(this.state.track.duration_ms, {long: true}).split(' ')[0]} minutos aproximadamente</b></Chip>
                                <Chip className="Track-extra" style={styles.separateChips}>N. {this.state.track.track_number} del álbum
                                    <Link href={`/album?q=${this.state.track.album.id}`}>
                                        {` ${this.state.track.album.name}`}
                                    </Link>
                                </Chip>
                            </div>
                            <audio
                                className="Track-preview"
                                controls='controls'
                                src={this.state.track.preview_url}
                                style={styles.center}
                            />
                        </Paper>
                    </div>
                </Material>
            )
        }
    }
}

export default Track
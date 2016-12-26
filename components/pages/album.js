/**
 * Created by miguhruiz on 25/12/16.
 */
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Material from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../loading'
import Header from '../header'
import { CardMedia, CardTitle } from 'material-ui/Card'

import actions from '../../src/actions'

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

class AlbumPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            id: props.id
        }
    }
    async componentDidMount() {
        await this.props.actions.loadAlbum(this.state.id)

        this.setState({
            loading: false
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        } else {
            return (
                <Material>
                    <div className="Album">
                        <Head>
                            <meta name="viewport"
                                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                            <link rel="stylesheet"
                                  href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
                        </Head>
                        <Header />
                        <div className="Album-all" style={styles.columns}>
                            <CardMedia
                                className="Album-cover"
                                overlay={<CardTitle title={this.props.album.name}
                                                    subtitle={`Por ${this.props.album.artists[0].name}; Popularidad: ${this.props.album.popularity}%`}/>}
                                style={styles.card}
                            >
                                <img
                                    src={this.props.album.images[0].url}
                                    alt="Album Cover"/>
                            </CardMedia>
                            <div className="Album-details">
                                <ul className="Album-tracks" style={styles.noDecorationList}>
                                    <h2> Este álbum incluye...</h2>
                                    {
                                        this.props.album.tracks.items.map(
                                            track => {
                                                return (
                                                    <a href={`/track?q=${track.id}`} style={styles.noLinks}>
                                                        <li style={styles.separate}>
                                                            {track.track_number}.<b
                                                            style={styles.songName}>{track.name}</b>
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

function mapStateToProps(state) {
    return {
        album: state.album[0]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage)
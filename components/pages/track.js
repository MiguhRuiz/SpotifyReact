/**
 * Created by miguhruiz on 25/12/16.
 */
import React from 'react'
import ms from 'ms'
import Link from 'next/link'
import Material from 'material-ui/styles/MuiThemeProvider'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Loading from '../loading'
import Header from '../header'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import actions from '../../src/actions'
import api from '../../lib/api'

const styles = {
    center: {
        display: 'block',
        margin: '0 auto'
    },
    textCenter: {
        textAlign: 'center'
    },
    separateChips: {
        marginRight: '1em',
        marginBottom: '0.5em'
    }
}

class TrackPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            id: props.id
        }
    }
    async componentDidMount() {
        await this.props.actions.loadTrack(this.state.id)

        this.setState({
            loading: false
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
                            <h1 className="Track-name" style={styles.textCenter}>{this.props.track.get('name')}</h1>
                            {
                                this.props.track.get('explicit') && (
                                    <b className="Track-explicit">EXPLICIT</b>
                                )
                            }
                            <div className="Track-extra" style={{display: 'flex', justifyContent: 'center', marginBottom: '1em', flexWrap: 'wrap'}}>
                                <Chip className="Track-author" style={styles.separateChips}>De: {this.props.track.get('artists')[0].name}</Chip>
                                <Chip className="Track-popularity" style={styles.separateChips}>Popularidad: <b>{this.props.track.get('popularity')}%</b></Chip>
                                <Chip className="Track-duration" style={styles.separateChips}><b>{ms(this.props.track.get('duration_ms'), {long: true}).split(' ')[0]} minutos aproximadamente</b></Chip>
                                <Chip className="Track-extra" style={styles.separateChips}>N. {this.props.track.get('track_number')} del álbum
                                    <Link href={`/album?q=${this.props.track.get('album').id}`}>
                                        {` ${this.props.track.get('album').name}`}
                                    </Link>
                                </Chip>
                            </div>
                            <audio
                                className="Track-preview"
                                controls='controls'
                                src={this.props.track.get('preview_url')}
                                style={styles.center}
                            />
                        </Paper>
                    </div>
                </Material>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        track: state.get('track').get(props.id)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage)
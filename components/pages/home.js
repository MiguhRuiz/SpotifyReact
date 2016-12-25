/**
 * Created by miguhruiz on 25/12/16.
 */
import React from 'react'
import Material from 'material-ui/styles/MuiThemeProvider'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchBox from '../searchBox'
import Paper from 'material-ui/Paper/'
import Header from '../header'

import actions from '../../src/actions'

const styles = {
    center: {
        textAlign: 'center'
    }
}

class HomePage extends React.Component {
    render() {
        return(
            <Material>
                <div className="app">
                    <Head>
                        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
                    </Head>
                    <Header />
                    <Paper className="Home" zDepth="3">
                        <h1 style={styles.center}>¡Bienvenido a <b>SpotifyReact</b>!</h1>
                        <h2 style={styles.center}>¿Sobre qué álbum o artista te gustaría aprender hoy?</h2>
                        <SearchBox/>
                    </Paper>
                </div>
            </Material>
        )
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
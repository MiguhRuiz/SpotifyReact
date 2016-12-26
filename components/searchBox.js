/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchCounter from './searchCounter'
import SearchResult from './searchResult'
import TextField from 'material-ui/TextField'
import { GridList } from 'material-ui/GridList'

import api from '../lib/api'
import actions from '../src/actions'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '2em'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    search: {
        display: 'block',
        margin: '0 auto'
    }
}

class SearchBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(ev) {
        if(ev.charCode == 13) {
            const e = document.getElementById('search-box')
            e.blur()

            const query = e.value
            const data = await api.searchAlbum(query)

            this.setState({
                data
            })
        }
    }
    render() {
        return(
            <div className="search-logic">
                <TextField
                    id="search-box"
                    type="search"
                    placeholder="Quiero aprender sobre..."
                    style={styles.search}
                    onKeyPress={this.handleSubmit}
                />
                {this.state.data && (
                    <SearchCounter
                        albums={this.state.data.albums.total}
                        tracks={this.state.data.tracks.total}
                    />
                )}
                <div className="albums" style={styles.root}>

                        { this.state.data &&
                            this.state.data.albums.items.length > 0 && (
                                    <GridList style={styles.gridList} cols={2.2}>
                                        {
                                            this.state.data.albums.items.map(
                                                album => {
                                                    return (
                                                        <SearchResult {...album}/>
                                                    )
                                                })
                                        }
                                    </GridList>
                        )}
                </div>
                <section className="tracks">
                    { this.state.data &&
                    this.state.data.tracks.items.length > 0 && (
                        <GridList style={styles.gridList} cols={2.2}>
                            {
                                this.state.data.tracks.items.map(
                                    track => {
                                        return (
                                            <SearchResult {...track}/>
                                        )
                                    })
                            }
                        </GridList>
                    )}
                </section>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
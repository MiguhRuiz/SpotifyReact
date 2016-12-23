/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'

import SearchCounter from './searchCounter'
import SearchResult from './searchResult'

import api from '../lib/api'

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
                <input
                    id="search-box"
                    type="search"
                    placeholder="Quiero aprender sobre..."
                    onKeyPress={this.handleSubmit}
                />
                {this.state.data && (
                    <SearchCounter
                        albums={this.state.data.albums.total}
                        tracks={this.state.data.tracks.total}
                    />
                )}
                <section className="albums">
                    <span>Álbumes:</span>
                    { this.state.data &&
                        this.state.data.albums.items.length > 0 && (
                        this.state.data.albums.items.map(
                            album => {
                                return <SearchResult
                                    {...album}
                                />
                            })
                    )}
                </section>
                <section className="tracks">
                    <span>Canciones:</span>
                    { this.state.data &&
                    this.state.data.tracks.items.length > 0 && (
                        this.state.data.tracks.items.map(
                            track => {
                                return <SearchResult
                                    {...track}
                                />
                            })
                    )}
                </section>
            </div>
        )
    }
}

export default SearchBox
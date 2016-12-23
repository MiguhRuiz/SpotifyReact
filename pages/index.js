/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'

import SearchBox from '../components/searchBox'

class HomeSearch extends React.Component {
    render() {
        console.log(this.state)
        return(
            <div class="Home">
                <h1>¡Bienvenido a <b>SpotifyReact</b>!</h1>
                <h2>¿Sobre qué álbum o artista te gustaría aprender hoy?</h2>
                <SearchBox/>
            </div>
        )
    }
}

export default HomeSearch
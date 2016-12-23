/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'

function SearchCounter(props) {
    return (
        <h2>Hemos encontrado {props.albums} albums y {props.tracks} canciones.
            Aquí tienes algunas:</h2>
    )
}

export default SearchCounter
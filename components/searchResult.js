/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import Link from 'next/link'

function SearchResult(props) {
    return (
        <article className={`${props.type}-${props.id}`}>
            {
                props.type == 'album' && (
                    <div className={`${props.type}-image`}>
                        <Link href={`/${props.type}?q=${props.id}`}>
                            <img src={props.images[0].url} />
                        </Link>
                    </div>
                )
            }
            <div className={`${props.type}-data`}>
                <h4>{props.name}</h4>
                <form action={props.external_urls.spotify}>
                    <button>Escuchar</button>
                </form>
                <h5>De: {props.artists[0].name}</h5>
            </div>
        </article>
    )
}

export default SearchResult
/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import { Provider } from 'react-redux'

import AlbumPage from '../components/pages/album'

import store from '../src/store'

class Album extends React.Component {
    render() {
        return(
           <Provider store={store}>
                <AlbumPage id={this.props.url.query.q}/>
           </Provider>
        )
    }
}

export default Album
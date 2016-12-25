/**
 * Created by miguhruiz on 23/12/16.
 */
import React from 'react'
import { Provider } from 'react-redux'

import TrackPage from '../components/pages/track'

import store from '../src/store'

class Track extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <TrackPage id={this.props.url.query.q}/>
            </Provider>
        )
    }
}

export default Track
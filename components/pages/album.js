/**
 * Created by miguhruiz on 25/12/16.
 */
import React, { PropTypes } from 'react';
import Head from 'next/head';
import Material from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardMedia, CardTitle } from 'material-ui/Card';
import Immutable from 'immutable';

import Loading from '../Loading';
import Header from '../Header';
import TrackBody from '../TrackBody';

import actions from '../../src/actions';

const styles = {
  card: {
    width: '600px',
  },
  columns: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  noDecorationList: {
    listStyle: 'none',
  },
};

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: props.id,
    };
  }
  async componentDidMount() {
    await this.props.actions.loadAlbum(this.state.id);
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <Material>
        <div className="Album">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no,
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
            <title>{`${this.props.album.get('name')} en SpotifyReact`}</title>
          </Head>
          <Header />
          <div className="Album-all" style={styles.columns}>
            <CardMedia
              className="Album-cover"
              overlay={<CardTitle
                title={this.props.album.get('name')}
                subtitle={`Por ${this.props.album.get('artists')[0].name}; Popularidad: ${this.props.album.get('popularity')}%`}
              />}
              style={styles.card}
            >
              <img src={this.props.album.get('images')[0].url} alt="Album Cover" />
            </CardMedia>
            <div className="Album-details">
              <ul className="Album-tracks" style={styles.noDecorationList}>
                <h2>Este álbum incluye...</h2>
                {
                  this.props.album.get('tracks').items.map(
                    (track) => {
                      return <TrackBody {...track} />;
                    },
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </Material>
    );
  }
}

AlbumPage.propTypes = {
  id: PropTypes.string,
  actions: PropTypes.shape(PropTypes.func),
  album: PropTypes.instanceOf(Immutable.List),
};

AlbumPage.defaultProps = {
  album: null,
};

function mapStateToProps(state, props) {
  return {
    album: state.get('album').get(props.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);

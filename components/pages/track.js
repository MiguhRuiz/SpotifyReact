/**
 * Created by miguhruiz on 25/12/16.
 */
import React, { PropTypes } from 'react';
import ms from 'ms';
import Material from 'material-ui/styles/MuiThemeProvider';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Immutable from 'immutable';

import Loading from '../Loading';
import Header from '../Header';

import actions from '../../src/actions';

const styles = {
  center: {
    display: 'block',
    margin: '0 auto',
  },
  textCenter: {
    textAlign: 'center',
  },
  separateChips: {
    marginRight: '1em',
    marginBottom: '0.5em',
  },
};

class TrackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Material>
        <div className="Track">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no,
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
            <title>{`${this.props.track.get('name')} en SpotifyReact`}</title>
          </Head>
          <Header />
          <Paper zDepth="3">
            <h1 className="Track-name" style={styles.textCenter}>{this.props.track.get('name')}</h1>
            {
              this.props.track.get('explicit') && (
                <b className="Track-explicit">EXPLICIT</b>
               )
            }
            <div className="Track-extra" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em', flexWrap: 'wrap' }}>
              <Chip className="Track-author" style={styles.separateChips}>De: {this.props.track.get('artists')[0].name}</Chip>
              <Chip className="Track-duration" style={styles.separateChips}><b>{ms(this.props.track.get('duration_ms'), { long: true }).split(' ')[0]} minutos aproximadamente</b></Chip>
            </div>
            <audio
              className="Track-preview"
              controls="controls"
              src={this.props.track.get('preview_url')}
              style={styles.center}
            />
          </Paper>
        </div>
      </Material>
    );
  }
}

TrackPage.propTypes = {
  track: PropTypes.instanceOf(Immutable.List),
};

function mapStateToProps(state, props) {
  return {
    track: state.get('albumTracks').get(props.id) || state.get('search').get('tracks').get('entities').get(props.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage);

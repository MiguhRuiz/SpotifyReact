/**
 * Created by miguhruiz on 23/12/16.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import Immutable from 'immutable';

import SearchCounter from './SearchCounter';
import SearchResult from './SearchResult';
import actions from '../src/actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: '2em',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  search: {
    display: 'block',
    margin: '0 auto',
  },
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    if (event.charCode === 13) {
      const element = document.getElementById('search-box');
      element.blur();

      const query = element.value;
      await this.props.actions.setSearchAlbum(query);
      await this.props.actions.setSearchTrack(query);

      this.setState({ searchResult: true });
    }
  }
  render() {
    return (
      <div className="search-logic">
        <TextField
          id="search-box"
          type="search"
          placeholder="Quiero aprender sobre..."
          style={styles.search}
          onKeyPress={this.handleSubmit}
        />
        {this.state.searchResult && (
          <SearchCounter
            albums={this.props.search.get('albums').get('total')}
            tracks={this.props.search.get('tracks').get('total')}
          />
        )}
        <div className="albums" style={styles.root}>

          { this.state.searchResult &&
            this.props.search.get('albums').get('total') > 0 && (
              <GridList style={styles.gridList} cols={2.2}>
                {
                  this.props.search.get('albums').get('entities').map(
                    (album) => {
                      return <SearchResult {...album.toJS()} />;
                    },
                  ).toArray()
                }
              </GridList>
          )}
        </div>
        <section className="tracks">
          { this.state.searchResult > 0 &&
            this.props.search.get('tracks').get('total') > 0 && (
              <GridList style={styles.gridList} cols={2.2}>
                {
                  this.props.search.get('tracks').get('entities').map(
                    (track) => {
                      return <SearchResult {...track.toJS()} />;
                    },
                  ).toArray()
                }
              </GridList>
          )}
        </section>
      </div>
    );
  }
}

SearchBox.propTypes = {
  actions: PropTypes.shape(PropTypes.func),
  search: PropTypes.instanceOf(Immutable.List),
};

function mapStateToProps(state) {
  return {
    search: state.get('search'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);

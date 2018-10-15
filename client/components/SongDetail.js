import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if(!song) {
      return <div>Loading...</div>;
    } 
    return (
      <div>
        <Link to={'/songs'}>back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}></LyricList>
        <LyricCreate songId={this.props.match.params.id}></LyricCreate>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(SongDetail);
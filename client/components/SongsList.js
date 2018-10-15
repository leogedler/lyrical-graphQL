import React, { Component } from 'react';
import query from '../queries/fetchSongs';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import gql from 'graphql-tag';

class SongsList extends Component {

  onSongDelete(id){
    this.props.mutate({
      variables:{
        id
      }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i 
            className="material-icons"
            onClick={() => this.onSongDelete(id) }
          >delete</i>
        </li>
      )
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <ul className="collection">
            {this.renderSongs()}
          </ul>
          <div>
            <Link 
            to={'/songs/new'} 
            className="btn-floating btn-large red right">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      );
    }

  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
      title
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongsList)
);
import React, { Component } from 'react';
import gql from 'graphql-tag';
import fetchSongsQuery from '../queries/fetchSongs';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.mutate({
      variables:{
        title: this.state.title
      },
      refetchQueries: [{ query: fetchSongsQuery }]
    })
    .then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <div>
        <Link to={'/'}>Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
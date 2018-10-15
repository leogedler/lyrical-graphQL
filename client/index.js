import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SongDetail from './components/SongDetail';
import SongsList from './components/SongsList';
import SongCreate from './components/SongCreate';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path='/songs/new' component={SongCreate}></Route>
            <Route path='/songs/:id' component={SongDetail}></Route>
            <Route path='/' component={SongsList}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';

import * as actions from './actions';

import Header from './containers/Header';
import Routes from './Routes';

/**
 * this container is defined as class so we can modify state
 * @return {Component} react base component
 */
class App extends Component {
  componentDidMount() {
    // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
    window.addEventListener('focus', this.getCurrentUser);
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <CssBaseline>
        <BrowserRouter>
          <main className="container">
            <Header />
            <Routes />
          </main>
        </BrowserRouter>
      </CssBaseline>
    );
  }
}

export default connect(null, actions)(App);

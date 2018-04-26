import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
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
  constructor(props) {
    super(props);

    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    // Workaround to avoid re-rendering & CORS issues Credit @jenovs https://github.com/jenovs & https://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa/29314111#29314111
    window.addEventListener('focus', this.getCurrentUser);
    this.props.fetchUser();
  }

  getCurrentUser() {
    this.props.fetchUser();
  }

  render() {
    return (
      <CssBaseline>
        <BrowserRouter>
          <main className="container">
            <Header />
            <ul className="left">
              <li>
                <Link to="/activities/lacyjpr">Activities</Link>
              </li>
            </ul>
            <Routes />
          </main>
        </BrowserRouter>
      </CssBaseline>
    );
  }
}

export default connect(null, actions)(App);

import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

import Header from './containers/Header';
import Routes from './Routes';

import reactLogo from './assets/React-icon.png';

/**
 * this container is defined as class so we can modify state
 * @return {Component} react base component
 */
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <main className="container">
          <Header />
          <div>
            <h1>hello world!</h1>
            <img
              className="container__image"
              alt="react logo"
              src={reactLogo}
            />
            <p>If you see this everything is working!</p>
          </div>
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <Routes />
        </main>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);

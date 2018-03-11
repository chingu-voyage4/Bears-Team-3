import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <button
            type="button"
            className="nav__login"
            onClick={this.handleLogin}
          >
            Log In With Github
          </button>
        );
      default:
        return (
          <div className="nav__logout">
            <a href="/api/logout">Logout</a>
          </div>
        );
    }
  }

  render() {
    return <nav className="nav">{this.renderContent()}</nav>;
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, actions)(Header);

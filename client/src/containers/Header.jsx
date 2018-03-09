import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="nav__login">
            <a href="/auth/github">Login With Github</a>
          </div>
        );
      default:
        return (
          <div className="nav__logout">
            <a href="api/logout">Logout</a>
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

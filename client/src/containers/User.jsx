import React, { Component } from 'react';

class User extends Component {
  state = {
    user: null,
  };

  componentWillMount() {
    this.setState({ user: this.props.match.params.userName });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <h2>{user} Page</h2>
        <p>Welcome {user}!</p>
      </div>
    );
  }
}

export default User;

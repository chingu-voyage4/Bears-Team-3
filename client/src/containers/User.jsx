import React, { Component } from 'react';

class User extends Component {
  state = {
    user: null,
  };

  componentWillMount() {
    console.log(this.props.match.params.userName);
    this.setState({ user: this.props.match.params.userName });
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <h2>{user} Page</h2>
        <p>Welcome {user}!</p>
      </div>
    );
  }
}

export default User;

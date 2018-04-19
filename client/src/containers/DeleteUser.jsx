import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import Button from 'material-ui/Button';

import { deleteUser } from '../actions';

class DeleteUser extends Component {
  state = {
    redirect: false,
  };
  handleClick = async () => {
    console.log('handleClick called');
    try {
      let res = await this.props.deleteUser();
      console.log(res);
      if (res.payload.status === 400) throw new Error();
      this.setState({ redirect: true });
    } catch (err) {
      return null;
    }
  };
  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div>
        <h2>Delete Your Account</h2>
        <p>This will permanently remove all of your data</p>
        <p>Are you sure?</p>
        <Button variant="raised" color="primary" onClick={this.handleClick}>
          Yes, Delete My Account
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteUser }, dispatch);
};

export default connect(null, mapDispatchToProps)(DeleteUser);

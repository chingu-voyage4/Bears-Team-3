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
  handleClick = async (deleteUser, _this) => {
    try {
      const res = await deleteUser();
      if (res.type !== 'DELETE_USER_SUCCESS') throw new Error();
      _this.setState({ redirect: true });
    } catch (err) {
      console.log(err);
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
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.handleClick(this.props.deleteUser, this)}
        >
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';

import { deleteUser } from '../actions';

class DeleteUser extends Component {
  render() {
    return (
      <div>
        <h2>Delete Your Account</h2>
        <p>This will permanently remove all of your data</p>
        <p>Are you sure?</p>
        {this.renderRedirect()}
        <Button
          variant="raised"
          color="primary"
          onClick={() => {
            this.props.deleteUser();
          }}
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

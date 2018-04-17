import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';

import { deleteUser } from '../actions';

const DeleteUser = () => (
  <div>
    <h2>Delete Your Account</h2>
    <p>This will permanently remove all of your data</p>
    <p>Are you sure?</p>
    <Button variant="raised" color="primary">
      Yes, Delete My Account
    </Button>
  </div>
);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteUser }, dispatch);
};

export default connect(mapDispatchToProps)(DeleteUser);

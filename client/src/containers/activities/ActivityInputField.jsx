import React, { Component } from 'react';
import { TextField, withStyles } from 'material-ui';

import { styles } from './exports';

class ActivityInputField extends Component {
  state = {};

  handleChange = event => {
    const { label } = this.props;
    this.setState({
      [label]: event.target.value,
    });
  };

  render() {
    const {
      input,
      label,
      meta: { error, touched },
      classes,
      helperText,
    } = this.props;

    return (
      <div>
        <TextField
          error={touched && error ? true : false}
          label={touched && error ? error : label}
          className={classes.textField}
          value={this.state[label]}
          onChange={this.handleChange}
          helperText={helperText}
          {...input}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ActivityInputField);

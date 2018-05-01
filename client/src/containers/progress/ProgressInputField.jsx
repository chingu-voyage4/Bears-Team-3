import React, { Component } from 'react';
import { TextField, withStyles } from 'material-ui';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    width: '90%',
  },
});

class ProgressInputField extends Component {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { input, label, meta: { error, touched }, classes } = this.props;
    return (
      <div>
        <TextField
          error={touched && error ? true : false}
          label={touched && error ? error : label}
          className={classes.textField}
          value={this.state[label]}
          onChange={this.handleChange(label)}
          multiline={label === 'Study Plan'}
          rows="8"
          {...input}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProgressInputField);

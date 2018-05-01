import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { styles } from './exports';

class DatePicker extends Component {
  state = { dateCompleted: new Date() };

  handleChange = event => {
    const dateCompleted = new Date(event.target.value);
    this.setState({ dateCompleted });
  };

  formatDate = date => {
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();

    const month = m < 10 ? `0${m}` : m;
    const day = d < 10 ? `0${d}` : d;

    console.log(`${date.getFullYear()}-${month}-${day}`);

    return `${date.getFullYear()}-${month}-${day}`;
  };

  render() {
    const {
      formatDate,
      handleChange,
      props: { classes, input, label },
      state: { dateCompleted },
    } = this;

    return (
      <div>
        <TextField
          {...input}
          label={label}
          type="date"
          value={`${formatDate(dateCompleted)}`}
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);

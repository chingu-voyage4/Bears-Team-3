import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import DatePicker from 'material-ui-pickers/DatePicker';

import { styles } from './exports';

class DateSelector extends Component {
  state = {};

  handleChange = event => {
    const { name } = this.props.input;
    this.setState({
      [name]: event,
    });
  };

  render() {
    const { props: { classes, input, label }, state: { dateCompleted } } = this;
    console.log(this.state[input.name]);
    console.log(typeof this.state[input.name]);
    let date;
    if (typeof this.state[input.name] === undefined) {
      date = new Date();
    } else {
      date = this.state[input.name];
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <DatePicker
            autoOk={true}
            animateYearScrolling={false}
            className={classes.textField}
            disableFuture
            format="MMM DD, YYYY"
            label={label}
            maxDateMessage="You can't add future accomplishments!"
            minDate="2018-01-01"
            onChange={this.handleChange}
            showTodayButton
            value={date}
            {...input}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(DateSelector);

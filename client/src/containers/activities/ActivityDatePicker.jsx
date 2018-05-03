import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import DatePicker from 'material-ui-pickers/DatePicker';

import { styles } from './exports';

class DateSelector extends Component {
  state = { dateCompleted: new Date(dateCompleted) };

  handleDateChange = date => {
    this.setState({ dateCompleted: date });
  };

  render() {
    const {
      handleChange,
      props: { classes, input, label },
      state: { dateCompleted },
    } = this;
    console.log(dateCompleted);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <DatePicker
            {...input}
            autoOk={true}
            animateYearScrolling={false}
            className={classes.textField}
            disableFuture
            format="MMM DD"
            label={label}
            maxDateMessage="You can't add future accomplishments!"
            minDate="2018-01-01"
            onChange={this.handleDateChange}
            showTodayButton
            value={dateCompleted}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(DateSelector);

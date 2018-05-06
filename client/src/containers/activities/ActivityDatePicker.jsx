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

  componentDidMount() {
    const language = window.navigator.language;
    this.setState({ lang: language });
  }

  render() {
    const { classes, input, label } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <DatePicker
            autoOk={true}
            animateYearScrolling={false}
            className={classes.textField}
            disableFuture
            format={this.state.lang === 'en-US' ? 'MMM DD YYYY' : 'DD MMM YYYY'}
            label={label}
            maxDateMessage="You can't add future accomplishments!"
            minDate="2018-01-01"
            onChange={this.handleChange}
            showTodayButton
            value={this.state[input.name]}
            {...input}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(DateSelector);

import React, { Component } from 'react';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  withStyles,
} from 'material-ui';

import { styles } from './exports';

const ACTIVITIES = [
  'Basic Project',
  'Substantial Project',
  'Large Project',
  'Gigantic Project',
  'Book',
  'Tutorial Course',
  'University Level Course',
  'Physical Activity',
  'Musical Instrument Practice',
  'Khan Academy',
  'Analytics Vidhya Competition',
  'Crowd Analytix Competition',
  'Kaggle Competition',
  'Driven Data Competition',
  'Design Competition',
  'Blog Post',
  'Blog Post Tutorial',
  'Practice Writing Skills',
  'Video Tutorial',
  'Open Source PR',
  'Module to npm',
  'Team Up for a project',
  'Diary entry',
  'CodeWars',
  'CodinGame Tier',
  'CodinGame Bot Competition',
  'HackerRank',
  'Google Code Jam',
];

class ActivitySelectField extends Component {
  state = { activity: '' };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderOptions = () => {
    return ACTIVITIES.map(activity => {
      return (
        <MenuItem key={activity} value={activity}>
          {activity}
        </MenuItem>
      );
    });
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      classes,
    } = this.props;
    const showError = touched && error ? true : false;
    return (
      <div>
        <FormControl className={classes.formControl} error={showError}>
          <InputLabel htmlFor="activity-type">{label}</InputLabel>
          <Select
            value={this.state.activity}
            onChange={this.handleChange}
            {...input}
            inputProps={{ name: 'activity', id: 'activity-type' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.renderOptions()}
          </Select>
          {showError ? <FormHelperText>{error}</FormHelperText> : null}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(ActivitySelectField);

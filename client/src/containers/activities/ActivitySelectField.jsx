import React, { Component } from 'react';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  withStyles,
} from 'material-ui';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

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
    const { input, label, touched, meta, classes } = this.props;
    return (
      <div>
        <FormControl className={classes.formControl}>
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
        </FormControl>
        {touched && error}
      </div>
    );
  }
}

export default withStyles(styles)(ActivitySelectField);

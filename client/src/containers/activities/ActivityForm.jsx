import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import Done from 'material-ui-icons/Done';
import Cancel from 'material-ui-icons/Cancel';

import ActivityInputField from './ActivityInputField';
import ActivitySelectField from './ActivitySelectField';
import ActivityDatePicker from './ActivityDatePicker';
import { addActivity } from '../../actions';
import { FIELDS } from './exports';

class ActivityForm extends Component {
  renderFields = () => {
    return FIELDS.map(({ label, name, helperText }) => {
      let component;
      if (name === 'activity') {
        component = ActivitySelectField;
      } else if (name === 'dateCompleted') {
        component = ActivityDatePicker;
      } else {
        component = ActivityInputField;
      }

      return (
        <Field
          key={name}
          label={label}
          name={name}
          required={name !== 'url'}
          props={{ helperText }}
          component={component}
        />
      );
    });
  };

  render() {
    const { addActivity, history, handleSubmit, userName } = this.props;
    return (
      <div>
        <h2>Add an Activity</h2>
        <form
          onSubmit={handleSubmit(values =>
            addActivity(values, history, userName)
          )}
        >
          {this.renderFields()}
          <Button
            variant="raised"
            color="secondary"
            onClick={() => history.push(`/users/${userName}`)}
          >
            Cancel
            <Cancel />
          </Button>
          <Button variant="raised" color="primary" type="submit">
            Add Activity
            <Done />
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addActivity }, dispatch);
};

const mapStateToProps = state => ({
  userName: state.authReducer.userName,
});

const connectedActivityForm = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ActivityForm)
);

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name, errmsg }) => {
    if (!values[name] && name !== 'url') errors[name] = errmsg;
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'activityForm',
})(connectedActivityForm);

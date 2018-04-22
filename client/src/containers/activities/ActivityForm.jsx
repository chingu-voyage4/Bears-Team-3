import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import ActivityInputField from './ActivityInputField';
import ActivitySelectField from './ActivitySelectField';
import { addActivity } from '../../actions';

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'Repo Link', name: 'url' },
  { label: 'Activity', name: 'activity' },
];

class ActivityForm extends Component {
  renderFields = () => {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          component={
            name === 'activity' ? ActivitySelectField : ActivityInputField
          }
        />
      );
    });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values =>
          this.props.addActivity(values, this.props.history)
        )}
      >
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addActivity }, dispatch);
};

const connectedActivityForm = connect(null, mapDispatchToProps)(
  withRouter(ActivityForm)
);

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name]) errors[name] = `You must have a ${name}`;
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'activityForm',
})(connectedActivityForm);

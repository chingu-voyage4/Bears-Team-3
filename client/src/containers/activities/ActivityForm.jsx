import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

import ActivityInputField from './ActivityInputField';
import { addActivity } from '../../actions';

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'URL', name: 'url' },
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
          component={ActivityInputField}
          type="text"
        />
      );
    });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values =>
          this.props.addActivity(values)
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

const connectedActivityForm = connect(null, mapDispatchToProps)(ActivityForm);

export default reduxForm({
  form: 'activityForm',
})(connectedActivityForm);

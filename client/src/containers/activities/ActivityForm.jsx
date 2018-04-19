import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import ActivityInputField from './ActivityInputField';

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'URL', name: 'url' },
  { label: 'Activity', name: 'activity' },
];

class activityForm extends Component {
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
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const ActivityForm = reduxForm({
  form: 'activityForm',
})(activityForm);

export default ActivityForm;

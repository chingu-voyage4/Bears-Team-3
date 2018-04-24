import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import NavigateNext from 'material-ui-icons/NavigateNext';
import Cancel from 'material-ui-icons/Cancel';

import ProgressInputField from './ProgressInputField';

const FIELDS = [
  { label: 'Current Course', name: 'course' },
  { label: 'Current Goal', name: 'goal' },
];

class ProgressPageOne extends Component {
  renderFields = () => {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          key={name}
          component={ProgressInputField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Button
            color="secondary"
            variant="raised"
            onClick={() => this.props.history.push('/')}
          >
            Cancel
            <Cancel />
          </Button>
          <Button type="submit" variant="raised" color="primary">
            Next
            <NavigateNext />
          </Button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name] && name !== 'url')
      errors[name] = `You must have a ${name}`;
  });

  return errors;
};

export default reduxForm({
  form: 'progressForm',
  validate,
  destroyOnUnmount: false,
})(withRouter(ProgressPageOne));

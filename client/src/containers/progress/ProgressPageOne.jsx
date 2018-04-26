import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import NavigateNext from 'material-ui-icons/NavigateNext';
import Cancel from 'material-ui-icons/Cancel';

import ProgressInputField from './ProgressInputField';

const FIELDS = [
  { label: 'Current Course', name: 'currentCourse' },
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
        <form>
          {this.renderFields()}
          <Button
            color="secondary"
            variant="raised"
            onClick={() => this.props.history.push(`/users/${this.props.user}`)}
          >
            Cancel
            <Cancel />
          </Button>
          <Button
            variant="raised"
            color="primary"
            onClick={() => this.props.showPage(2)}
          >
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

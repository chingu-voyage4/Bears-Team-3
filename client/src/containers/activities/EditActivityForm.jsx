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
import { modifyActivity } from '../../actions';

const FIELDS = [
  { label: 'Activity*', name: 'activity' },
  { label: 'Title*', name: 'title' },
  { label: 'URL', name: 'url' },
];

class EditActivityForm extends Component {
  componentDidMount() {
    const { id, activity, title, url } = this.props.location.state;
    console.log(id, activity, title, url);
  }
  renderFields = () => {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          required={name !== 'url'}
          component={
            name === 'activity' ? ActivitySelectField : ActivityInputField
          }
        />
      );
    });
  };

  render() {
    const { modifyActivity, history, handleSubmit, userName } = this.props;
    return (
      <div>
        <h2>Edit Activity</h2>
        <form
          onSubmit={handleSubmit(values =>
            modifyActivity(values, history, userName)
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
            Save
            <Done />
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ modifyActivity }, dispatch);
};

const mapStateToProps = state => ({
  userName: state.authReducer.userName,
});

const connectedEditActivityForm = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(EditActivityForm)
);

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name }) => {
    if (!values[name] && name !== 'url')
      errors[name] = `You must have a ${name}`;
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'EditActivityForm',
})(connectedEditActivityForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Done from 'material-ui-icons/Done';
import Cancel from 'material-ui-icons/Cancel';

import ActivityInputField from './ActivityInputField';
import ActivitySelectField from './ActivitySelectField';
import ActivityDatePicker from './ActivityDatePicker';
import { addActivity, modifyActivity } from '../../actions';
import { FIELDS } from './exports';

class ActivityForm extends Component {
  state = { editing: false, id: null };

  componentDidMount() {
    if (typeof this.props.location.state !== 'undefined') {
      const {
        id,
        activity,
        title,
        url,
        dateCompleted,
      } = this.props.location.state;

      this.setState({ editing: true, id });

      if (url !== 'undefined') {
        this.props.initialize({
          id,
          activity,
          title,
          url,
          dateCompleted,
        });
      } else {
        this.props.initialize({
          id,
          activity,
          title,
          dateCompleted,
        });
      }
    }
  }

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

  handleSubmitAction = (id, values, history, userName) => {
    if (!values.dateCompleted) values.dateCompleted = new Date();
    if (this.state.editing)
      return this.props.modifyActivity(id, values, history, userName);

    return this.props.addActivity(values, history, userName);
  };

  updateHistory = () => {
    const { history, userName } = this.props;
    history.push(`/users/${userName}`);
  };

  /* onSubmit = () => {
    const { history, handleSubmit, userName } = this.props;
    handleSubmit(values => {
      this.handleSubmitAction(this.state.id, values, history, userName);
    });
  } */

  render() {
    const { history, handleSubmit, userName } = this.props;
    const { editing } = this.state;

    return (
      <div>
        <h2>{editing ? 'Edit' : 'Add'} an Activity</h2>
        <form
          onSubmit={handleSubmit(values => {
            this.handleSubmitAction(this.state.id, values, history, userName);
          })}
        >
          {this.renderFields()}
          <Button
            variant="raised"
            color="secondary"
            onClick={this.updateHistory}
          >
            Cancel
            <Cancel />
          </Button>
          <Button variant="raised" color="primary" type="submit">
            {editing ? 'Save' : 'Add'} Activity
            <Done />
          </Button>
        </form>
      </div>
    );
  }
}

ActivityForm.propTypes = {
  activity: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
  modifyActivity: PropTypes.func,
  addActivity: PropTypes.func,
  history: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addActivity, modifyActivity }, dispatch);
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

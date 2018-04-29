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
import { addActivity, modifyActivity } from '../../actions';

const FIELDS = [
  { label: 'Activity*', name: 'activity' },
  { label: 'Title*', name: 'title' },
  { label: 'URL', name: 'url' },
];

class ActivityForm extends Component {
  componentDidMount() {
    if (typeof this.props.location.state !== 'undefined') {
      const { id, activity, title, url } = this.props.location.state;
      console.log(id, activity, title, url);
      if (url !== 'undefined') {
        this.props.initialize({
          id: id,
          activity: activity,
          title: title,
          url: url,
        });
      } else {
        this.props.initialize({
          id: id,
          activity: activity,
          title: title,
        });
      }
    }
  }

  renderFields = () => {
    if (typeof this.props.location.state !== 'undefined') {
      const { activity, title, url } = this.props.location.state;
      console.log(activity, title, url);
      return (
        <div>
          <Field
            key="activity"
            label="Activity*"
            name="activity"
            required={name !== 'url'}
            component={ActivitySelectField}
            //defaultValue={activity}
          />
          <Field
            key="title"
            label="Title*"
            name="title"
            required={name !== 'url'}
            component={ActivityInputField}
            //defaultValue={title}
          />
          {url !== 'undefined' && (
            <Field
              key="url"
              label="URL"
              name="url"
              required={name !== 'url'}
              component={ActivityInputField}
              //defaultValue={url}
            />
          )}
          {url === 'undefined' && (
            <Field
              key="url"
              label="URL"
              name="url"
              required={name !== 'url'}
              component={ActivityInputField}
            />
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Field
            key="activity"
            label="Activity*"
            name="activity"
            required={name !== 'url'}
            component={ActivitySelectField}
            //defaultValue={activity}
          />
          <Field
            key="title"
            label="Title*"
            name="title"
            required={name !== 'url'}
            component={ActivityInputField}
            //defaultValue={title}
          />
          <Field
            key="url"
            label="URL"
            name="url"
            required={name !== 'url'}
            component={ActivityInputField}
            //defaultValue={url}
          />
        </div>
      );
    }
  };

  render() {
    const {
      modifyActivity,
      addActivity,
      history,
      handleSubmit,
      userName,
    } = this.props;

    if (typeof this.props.location.state !== 'undefined') {
      const { id } = this.props.location.state;
      console.log(id);
      return (
        <div>
          <h2>Edit an Activity</h2>
          <form
            onSubmit={handleSubmit(
              values => {
                modifyActivity(id,  values, history, userName);
              }
              //{!this.props.location.state && (addActivity(values, history, userName))}
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
              Save Activity
              <Done />
            </Button>
          </form>
        </div>
      );
    } else {
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
}

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

  FIELDS.forEach(({ name }) => {
    if (!values[name] && name !== 'url')
      errors[name] = `You must have a ${name}`;
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'activityForm',
})(connectedActivityForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Typography, Grid, Paper, withStyles, Button } from 'material-ui';
import NavigateNext from 'material-ui-icons/NavigateNext';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

import ProgressInputField from './ProgressInputField';

const FIELDS = [{ label: 'Study Plan', name: 'studyPlan' }];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    wordBreak: 'break-all',
  },
  grid: {
    margin: 8,
    width: 'auto',
  },
});

class ProgressPageTwo extends Component {
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
    const {
      handleSubmit,
      showPage,
      form: { values },
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit(values => console.log(values))}>
                {this.renderFields()}
                <Button
                  color="secondary"
                  variant="raised"
                  onClick={() => showPage(1)}
                >
                  <NavigateBefore />
                  Back
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => showPage(3)}
                >
                  Next
                  <NavigateNext />
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Typography>{values.studyPlan}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form.progressForm,
});

const connectedProgressPageTwo = withStyles(styles)(
  connect(mapStateToProps)(ProgressPageTwo)
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
  form: 'progressForm',
  validate,
  destroyOnUnmount: false,
})(connectedProgressPageTwo);

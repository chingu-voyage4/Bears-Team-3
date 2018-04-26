import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Typography, Grid, Paper, withStyles, Button } from 'material-ui';
import NavigateNext from 'material-ui-icons/NavigateNext';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import marked from 'marked';

import ProgressInputField from './ProgressInputField';

const FIELDS = [{ label: 'Study Plan', name: 'studyPlan' }];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  breakAll: { wordBreak: 'break-all' },
  alignLeft: { textAlign: 'left' },
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
              <Typography variant="caption">
                Enter markdown for your study plan. Don't have one yet? Check
                out the{' '}
                <a
                  href="https://github.com/P1xt/speedstudy/tree/master/course-paths"
                  target="_blank"
                >
                  Speedstudy Coursepaths
                </a>{' '}
                to find one!
              </Typography>
              <form>
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
            <Paper className={`${classes.paper} ${classes.breakAll}`}>
              <Typography component="div">
                <h2>Study Plan Preview</h2>
                <hr />
                <div
                  className={classes.alignLeft}
                  dangerouslySetInnerHTML={{
                    __html: marked(values.studyPlan || ''),
                  }}
                />
              </Typography>
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

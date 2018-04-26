import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography, Grid, Paper, withStyles, Button } from 'material-ui';
import Done from 'material-ui-icons/Done';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Divider from 'material-ui/Divider';
import marked from 'marked';

import { addProgressData } from '../../actions';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left',
  }),
  paperContainer: {
    padding: '0 5%',
    margin: '10px 0',
  },
});

const FIELDS = [
  { label: 'Current Course', name: 'currentCourse' },
  { label: 'Current Goal', name: 'goal' },
  { label: 'Study Plan', name: 'studyPlan' },
];

const ProgressReviewForm = ({
  addProgressData,
  classes,
  formValues,
  history,
  showPage,
  userName,
}) => {
  const reviewFields = () => {
    return FIELDS.map(({ name, label }) => {
      return name !== 'studyPlan' ? (
        <div key={name}>
          <p>
            <b>{label}:</b> {formValues[name]}
          </p>
          <Divider />
        </div>
      ) : (
        <div key={name}>
          <p>
            <b>{label}</b>
            <br />
            <span
              dangerouslySetInnerHTML={{ __html: marked(formValues[name]) }}
            />
          </p>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>Please confirm your entries</h3>
      <div className={classes.paperContainer}>
        <Paper className={classes.root} elevation={4}>
          {reviewFields()}
        </Paper>
      </div>
      <div style={{ marginTop: 10 }}>
        <Button variant="raised" color="secondary" onClick={() => showPage(2)}>
          Back
          <NavigateBefore />
        </Button>
        <Button
          variant="raised"
          color="primary"
          onClick={() => addProgressData(formValues, userName, history)}
        >
          Submit <Done />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  formValues: state.form.progressForm.values,
  userName: state.authReducer.userName,
});

export default connect(mapStateToProps, { addProgressData })(
  withRouter(withStyles(styles)(ProgressReviewForm))
);

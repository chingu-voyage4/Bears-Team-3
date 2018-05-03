import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    width: '70%',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

export class UserGoals extends Component {
  getMarkDown = goal => {
    const markDown = marked(goal, { sanitize: true });
    return {
      __html: markDown,
    };
  };

  render() {
    const { classes, goal, points, currentCourse } = this.props;

    return (
      <div className="user__goal">
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Goals
          </Typography>
          {goal.length < 1 && <p>No goals yet!</p>}
          {goal.length > 0 && (
            <Typography
              style={{ textAlign: 'center' }}
              component="p"
              dangerouslySetInnerHTML={this.getMarkDown(goal)}
            />
          )}

          <Typography component="h4">Total Points: {points}</Typography>
          {currentCourse.length < 1 && (
            <Typography component="h4">
              Current Course: No course yet!
            </Typography>
          )}
          {currentCourse.length > 0 && (
            <Typography component="h4">
              Current Course: {currentCourse}
            </Typography>
          )}
        </Paper>
      </div>
    );
  }
}

UserGoals.propTypes = {
  classes: PropTypes.object.isRequired,
  goal: PropTypes.string,
  points: PropTypes.number,
  currentCourse: PropTypes.string,
};

export default withStyles(styles)(UserGoals);

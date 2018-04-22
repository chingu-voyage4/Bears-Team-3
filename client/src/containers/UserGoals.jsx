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
    const { classes, goal, points } = this.props;

    return (
      <div className="user__goal">
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Goals
          </Typography>
          <Typography
            style={{ textAlign: 'left' }}
            component="p"
            dangerouslySetInnerHTML={this.getMarkDown(goal)}
          />
          <Typography component="h4">Total Points: {points}</Typography>
        </Paper>
      </div>
    );
  }
}

UserGoals.propTypes = {
  classes: PropTypes.object.isRequired,
  goal: PropTypes.string,
  points: PropTypes.number,
};

export default withStyles(styles)(UserGoals);

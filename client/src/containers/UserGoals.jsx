import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

function UserGoals(props) {
  const { classes, goal } = props;
  console.log(props);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Goals
        </Typography>
        <Typography component="p">{goal}</Typography>
      </Paper>
    </div>
  );
}

UserGoals.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserGoals);

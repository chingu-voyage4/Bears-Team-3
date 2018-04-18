import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import LeaderBoard from './LeaderBoard';

const styles = theme => ({
  root: theme.mixins.gutters({
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const Home = props => {
  const { classes } = props;
  return (
    <div>
      <div className="home__intro">
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Speedstudy Tracker
          </Typography>
          <Typography component="p">
            Doing P1xt's{' '}
            <a target="_blank" href="https://github.com/P1xt/speedstudy">
              speedstudy
            </a>?
          </Typography>
          <Typography component="p">
            Log in for an easy way to track your progress!
          </Typography>
        </Paper>
      </div>
      <LeaderBoard />
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

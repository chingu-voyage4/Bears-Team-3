import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
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

export class Home extends Component {
  render() {
    const { classes, auth } = this.props;
    return (
      <div>
        <div className="home__intro">
          <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
              Speedstudy Tracker
            </Typography>
            {!auth.userName && (
              <div>
                <Typography component="p">
                  Doing P1xt's{' '}
                  <a target="_blank" href="https://github.com/P1xt/speedstudy">
                    speedstudy
                  </a>?
                </Typography>
                <Typography component="p">
                  Log in for an easy way to track your progress!
                </Typography>
              </div>
            )}
            {auth.userName && (
              <div>
                <Typography component="p">
                  Navigate to 'My Page' from the Avatar menu to track your
                  progress!
                </Typography>
              </div>
            )}
          </Paper>
        </div>
        {/* Pass auth prop to force re-mount. Assures that new users are added to the leaderboard. */}
        <LeaderBoard auth={auth} />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Home);

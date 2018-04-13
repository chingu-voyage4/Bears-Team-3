import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import UserActivities from './UserActivities';
import UserStudyPlan from './UserStudyPlan';

import * as actions from '../actions';
import UserGoals from './UserGoals';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
    width: '70%',
    justifyContent: 'center',
  },
});

class User extends Component {
  state = {
    user: null,
    isAuthenticated: false,
    value: 0,
  };

  checkAuth = () => {
    if (
      this.props.match.params.userName === this.props.userAuthenticated.userName
    ) {
      this.setState(prevState => {
        if (!prevState.isAuthenticated) return { isAuthenticated: true };
        return;
      });
      return true;
    }

    this.setState(prevState => {
      if (prevState.isAuthenticated) return { isAuthenticated: false };
      return;
    });
    return false;
  };

  async componentDidMount() {
    this.setState({ user: this.props.match.params.userName });
    this.props.clearProgressData();
    try {
      await this.props.fetchUserInfo(this.props.match.params.userName);
      this.props.fetchActivities(this.props.userPage._id);
      this.props.fetchProgressData(this.props.userPage._id);
    } catch (err) {
      this.props.history.push(`/404/${this.props.match.params.userName}`);
    }
  }

  componentDidUpdate() {
    this.checkAuth();
    console.log(this.state.isAuthenticated);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { user, value } = this.state;

    return (
      <div>
        <h2>{user}</h2>

        <UserGoals goal={this.props.userPage.goal} />

        <div className="user__tabs">
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} centered>
                <Tab label="Activities" />
                <Tab label="Study Plan" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <UserActivities />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <UserStudyPlan studyPlan={this.props.userPage.studyPlan} />
              </TabContainer>
            )}
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userAuthenticated: state.authReducer,
  activities: state.activities,
  userPage: state.userPage,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(User);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import TabContainer from './TabContainer';
import UserActivities from './UserActivities';
import UserStudyPlan from './UserStudyPlan';
import UserGoals from './UserGoals';

import {
  clearProgressData,
  fetchUserInfo,
  fetchActivities,
  fetchProgressData,
  clearActivities,
  clearUserPage,
} from '../actions';

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
    if (this.props.match.params.userName === this.props.userName) {
      this.setState(prevState => {
        if (!prevState.isAuthenticated) return { isAuthenticated: true };
      });
      return true;
    }

    this.setState(prevState => {
      if (prevState.isAuthenticated) return { isAuthenticated: false };
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

  componentWillUnmount() {
    this.props.clearActivities();
    this.props.clearUserPage();
  }

  componentDidUpdate() {
    this.checkAuth();
    console.log(this.state.isAuthenticated);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, userPage, activities } = this.props;
    const { user, value } = this.state;

    return (
      <div>
        <h2>{user}</h2>

        <UserGoals
          goal={userPage.goal}
          points={userPage.totalPoints}
          currentCourse={userPage.currentCourse}
        />

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
                {console.log(activities)}
                {activities && <UserActivities activities={activities} />}
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <UserStudyPlan studyPlan={userPage.studyPlan} />
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
  clearProgressData: PropTypes.func.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
  fetchProgressData: PropTypes.func.isRequired,
  clearUserPage: PropTypes.func.isRequired,
  userPage: PropTypes.string,
  userName: PropTypes.object,
  activities: PropTypes.array,
};

const mapStateToProps = state => ({
  userName: state.authReducer.userName,
  activities: state.activities,
  userPage: state.userPage,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearProgressData,
      fetchUserInfo,
      fetchActivities,
      fetchProgressData,
      clearActivities,
      clearUserPage,
    },
    dispatch
  );
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(User);

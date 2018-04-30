import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));
const goals = [
  'To be the very best',
  'To become the hokage',
  'Chillax with my bros',
];
const studyPlan = ['Do this first', 'Do that first', 'Do nothing'];
const currentCourse = [
  'Being a Boss 101',
  'Advanced Jutsu',
  "Professor Oak's Tutorial",
];

class Activities extends Component {
  state = { isAuthenticated: false };

  handleClick = () => {
    this.props.addActivity({
      title: 'My Project',
      url: 'www.notreal.com',
      activity: 'Basic Project',
    });
    this.props.fetchActivities(this.props.userPage._id);
  };

  handleDelete = id => {
    this.props.deleteActivity(id);
    this.props.fetchActivities(this.props.userPage._id);
  };

  handleUpdate = id => {
    const urls = [
      'www.yamama.com',
      'https://whosthere.com',
      'http://speedstudy.herokuapp.com',
    ];
    const titles = ['The Greatest Project', 'Meh', 'I Did This'];
    const projectType = [
      'Basic Project',
      'Physical Activity',
      'Tutorial Course',
    ];

    const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

    this.props.modifyActivity(id, {
      url: urls[getRandomNum(2)],
      title: titles[getRandomNum(2)],
      activity: projectType[getRandomNum(2)],
    });
    this.props.fetchActivities(this.props.userPage._id);
  };

  addProgress = () => {
    this.props.addProgressData({
      goal: goals[getRandomNum(2)],
      studyPlan: studyPlan[getRandomNum(2)],
      currentCourse: currentCourse[getRandomNum(2)],
    });
  };

  modifyProgress = () => {
    this.props.modifyProgressData({
      goal: goals[getRandomNum(2)],
      studyPlan: studyPlan[getRandomNum(2)],
      currentCourse: currentCourse[getRandomNum(2)],
    });
  };

  deleteProgress = () => {
    this.props.deleteProgressData();
  };

  deleteUser = () => {
    this.props.deleteUser();
  };

  checkAuth = () => {
    const { match: { params }, userAuthenticated: { userName } } = this.props;

    if (params.username === userName) {
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
    try {
      await this.props.fetchUserInfo(this.props.match.params.username);
      this.props.fetchActivities(this.props.userPage._id);
      this.props.fetchProgressData(this.props.userPage._id);
    } catch (err) {
      this.props.history.push(`/404/${this.props.match.params.username}`);
    }
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  renderActivities = () => {
    return this.props.activities.map((action, i) => {
      const { title, points, dateCompleted, activity, url, _id } = action;
      return (
        <ExpansionPanel key={i}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ width: '100%' }}>
              <b style={{ float: 'left' }}>{title}</b>
              <b style={{ float: 'right' }}>{points} points</b>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'block' }}>
            <p>
              Completed {activity} on{' '}
              {new Date(dateCompleted).toLocaleDateString()}
            </p>
            <p>{url}</p>
            {this.state.isAuthenticated && (
              <React.Fragment>
                <button onClick={() => this.handleDelete(_id)}>
                  Delete Activity
                </button>
                <button onClick={() => this.handleUpdate(_id)}>
                  Update Activity
                </button>
              </React.Fragment>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  render() {
    const { activities, userPage } = this.props;

    if (userPage) {
      const {
        currentCourse,
        goal,
        studyPlan,
        totalPoints,
        userName,
      } = userPage;
      return (
        <React.Fragment>
          <h2>{userName}</h2>
          <p>Total points: {totalPoints}</p>
          <div>
            <div>Current Course: {currentCourse}</div>
            <div>Goal: {goal}</div>
            <div>Study Plan: {studyPlan}</div>
          </div>
          <hr />
          {this.state.isAuthenticated && (
            <React.Fragment>
              <Link to="/activity/new">Add Activity</Link>
              <Link to="/progress/new">Add Progress</Link>
              <button onClick={this.modifyProgress}>Edit Progress</button>
              <button onClick={this.deleteProgress}>Delete Progress</button>
              <button onClick={this.deleteUser}>Delete Account</button>
            </React.Fragment>
          )}
          <hr />
          {activities && (
            <React.Fragment>
              <h2>Activities</h2>
              {this.renderActivities()}
            </React.Fragment>
          )}
        </React.Fragment>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

const mapStateToProps = state => ({
  userAuthenticated: state.authReducer,
  activities: state.activities,
  userPage: state.userPage,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);

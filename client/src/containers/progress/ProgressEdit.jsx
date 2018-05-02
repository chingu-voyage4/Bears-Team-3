import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ProgressEditPageOne from './ProgressEditPageOne';
//import ProgressPageTwo from './ProgressPageTwo';
import ProgressEditPageTwo from './ProgressEditPageTwo';

class ProgressEdit extends Component {
  componentDidMount() {
    if (typeof this.props.location.state !== 'undefined') {
      const { currentCourse, goal, studyPlan } = this.props.location.state;
      this.props.initialize({
        currentCourse: currentCourse,
        goal: goal,
        studyPlan: studyPlan,
      });
    }
  }
  state = { showPage: 1 };

  showPage = value => {
    if (value > 0 && value < 3) {
      this.setState({ showPage: value });
    }
  };

  renderContent = () => {
    const { showPage } = this.state;
    const { user } = this.props;

    if (showPage === 1) {
      return <ProgressEditPageOne showPage={this.showPage} user={user} />;
    } else {
      return <ProgressEditPageTwo showPage={this.showPage} user={user} />;
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.userName,
});

export default reduxForm({ form: 'progressEditForm' })(
  connect(mapStateToProps)(ProgressEdit)
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ProgressPageOne from './ProgressPageOne';
import ProgressPageTwo from './ProgressPageTwo';
import ProgressPageThree from './ProgressPageThree';

class ProgressForm extends Component {
  state = { showPage: 1, editing: false };

  componentDidMount() {
    if (typeof this.props.location.state !== 'undefined') {
      const { currentCourse, goal, studyPlan } = this.props.location.state;
      this.props.initialize({
        currentCourse: currentCourse,
        goal: goal,
        studyPlan: studyPlan,
      });
      this.setState({ ...this.state, editing: true });
    }
  }

  showPage = value => {
    if (value > 0 && value < 4) {
      this.setState({ showPage: value });
    }
  };

  renderContent = () => {
    const { showPage, editing } = this.state;
    const { user } = this.props;

    if (showPage === 1) {
      return <ProgressPageOne showPage={this.showPage} user={user} />;
    } else if (showPage === 2) {
      return <ProgressPageTwo showPage={this.showPage} />;
    } else {
      return (
        <ProgressPageThree
          showPage={this.showPage}
          user={user}
          editing={editing}
        />
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.userName,
});

export default reduxForm({ form: 'progressForm' })(
  connect(mapStateToProps)(ProgressForm)
);

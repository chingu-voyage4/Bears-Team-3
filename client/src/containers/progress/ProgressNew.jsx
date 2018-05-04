import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ProgressPageOne from './ProgressPageOne';
import ProgressPageTwo from './ProgressPageTwo';
import ProgressPageThree from './ProgressPageThree';

class ProgressNew extends Component {
  state = { showPage: 1 };

  showPage = value => {
    if (value > 0 && value < 4) {
      this.setState({ showPage: value });
    }
  };

  renderContent = () => {
    const { showPage } = this.state;
    const { user } = this.props;

    if (showPage === 1) {
      return <ProgressPageOne showPage={this.showPage} user={user} />;
    } else if (showPage === 2) {
      return <ProgressPageTwo showPage={this.showPage} />;
    } else {
      return <ProgressPageThree showPage={this.showPage} user={user} />;
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
  connect(mapStateToProps)(ProgressNew)
);

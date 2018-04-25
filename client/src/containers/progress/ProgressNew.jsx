import React, { Component } from 'react';
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

    if (showPage === 1) {
      return <ProgressPageOne showPage={this.showPage} />;
    } else if (showPage === 2) {
      return <ProgressPageTwo showPage={this.showPage} />;
    } else {
      return <ProgressPageThree showPage={this.showPage} />;
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'progressForm' })(ProgressNew);

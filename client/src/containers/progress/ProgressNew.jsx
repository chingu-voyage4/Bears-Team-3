import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import ProgressPageOne from './ProgressPageOne';
import ProgressPageTwo from './ProgressPageTwo';

class ProgressNew extends Component {
  state = { showPage: 1 };

  showPage = value => {
    this.setState({ showPage: value });
  };

  renderContent = () => {
    const { showPage } = this.state;

    if (showPage === 1) {
      return <ProgressPageOne showPage={this.showPage} />;
    } else if (showPage === 2) {
      return <ProgressPageTwo showPage={this.showPage} />;
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'progressForm' })(ProgressNew);

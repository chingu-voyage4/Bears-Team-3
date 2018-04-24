import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import ProgressPageOne from './ProgressPageOne';

class ProgressNew extends Component {
  state = {
    showPageOne: true,
    showPageTwo: false,
    showFormReview: false,
  };

  renderContent = () => {
    const { showPageOne, showPageTwo, showFormReview } = this.state;

    if (showPageOne) {
      return (
        <ProgressPageOne
          componentDidRender={() =>
            this.setState({
              ...this.state,
              showPageTwo: false,
              showFormReview: false,
            })
          }
        />
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'progressForm' })(ProgressNew);

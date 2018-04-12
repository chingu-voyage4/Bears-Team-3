import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import UserActivities from './UserActivities';
import UserStudyPlan from './UserStudyPlan';

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
    value: 0,
  };

  componentDidMount() {
    this.setState({ user: this.props.match.params.userName });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { user, value } = this.state;

    return (
      <div>
        <h2>{user} Page</h2>
        <p>Welcome {user}!</p>
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
                <UserStudyPlan />
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

export default withStyles(styles)(User);

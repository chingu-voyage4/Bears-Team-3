import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

export class UserStudyPlan extends Component {
  getMarkDown = studyPlan => {
    const markDown = marked(studyPlan, { sanitize: true });
    return {
      __html: markDown,
    };
  };

  render() {
    const { classes, studyPlan } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">
            Study Plan
          </Typography>
          <Typography
            component="p"
            style={{ textAlign: 'left' }}
            dangerouslySetInnerHTML={this.getMarkDown(studyPlan)}
          />
        </Paper>
      </div>
    );
  }
}

UserStudyPlan.propTypes = {
  classes: PropTypes.object.isRequired,
  studyPlan: PropTypes.string,
};

export default withStyles(styles)(UserStudyPlan);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { deleteActivity, fetchActivities } from '../actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 200,
    marginTop: 0,
  },
});

export class UserActivities extends Component {
  handleDelete = id => {
    this.props.deleteActivity(id);
    this.props.fetchActivities(this.props.userPage._id);
  };

  render() {
    const { classes, activities, isAuthenticated } = this.props;

    return (
      <div>
        {isAuthenticated && (
          <Link to="/activity/new" style={{ textDecoration: 'none' }}>
            <Button className={classes.button} color="primary">
              Add Activity
            </Button>
          </Link>
        )}
        <Paper className={classes.root}>
          {activities.length < 1 && <p>No activites yet!</p>}
          {activities.length > 0 && (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell numeric>Points</TableCell>
                  <TableCell numeric>Date</TableCell>
                  {isAuthenticated && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map(n => {
                  return (
                    <TableRow key={n._id}>
                      <TableCell>{n.activity}</TableCell>
                      <TableCell>
                        {n.url ? (
                          <a href={n.url} target="_blank">
                            {n.title}
                          </a>
                        ) : (
                          n.title
                        )}
                      </TableCell>
                      <TableCell numeric>{n.points}</TableCell>
                      <TableCell numeric>
                        {new Date(n.dateCompleted).toLocaleDateString()}
                      </TableCell>
                      {isAuthenticated && (
                        <TableCell>
                          <div className="table__actions">
                            <IconButton
                              size="small"
                              component={Link}
                              to={{
                                pathname: '/activity/edit',
                                state: {
                                  id: `${n._id}`,
                                  activity: `${n.activity}`,
                                  title: `${n.title}`,
                                  url: `${n.url}`,
<<<<<<< HEAD
                                  dateCompleted: n.dateCompleted,
||||||| merged common ancestors
=======
                                  dateCompleted: `${n.dateCompleted}`,
>>>>>>> development
                                },
                              }}
                              className={classes.menuButton}
                              color="primary"
                              aria-label="edit"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              className={classes.menuButton}
                              color="secondary"
                              aria-label="edit"
                              onClick={() => this.handleDelete(n._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Paper>
      </div>
    );
  }
}

UserActivities.propTypes = {
  classes: PropTypes.object.isRequired,
  activities: PropTypes.array,
};

const mapStateToProps = state => ({
  userPage: state.userPage,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteActivity, fetchActivities }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(UserActivities);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
                  <TableCell numeric>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell numeric>Points</TableCell>
                  <TableCell>Links</TableCell>
                  {isAuthenticated && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map(n => {
                  return (
                    <TableRow key={n._id}>
                      <TableCell numeric>
                        {new Date(n.dateCompleted).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{n.title}</TableCell>
                      <TableCell>{n.activity}</TableCell>
                      <TableCell numeric>{n.points}</TableCell>
                      <TableCell>{n.url}</TableCell>
                      {isAuthenticated && (
                        <TableCell>
                          <div>
                            <IconButton
                              size="small"
                              component={Link}
                              to="/activity/edit"
                              className={classes.menuButton}
                              color="primary"
                              aria-label="edit"
                              style={{display: 'inline'}}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              component={Link}
                              to="/"
                              className={classes.menuButton}
                              color="secondary"
                              aria-label="edit"
                              style={{display: 'inline'}}
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

export default withStyles(styles)(UserActivities);

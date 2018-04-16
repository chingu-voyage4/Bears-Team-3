import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

export class UserActivities extends Component {
  render() {
    const { classes, activities } = this.props;
    console.log(this.props);

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell numeric>Date</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell numeric>Points</TableCell>
              <TableCell>Links</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map(n => {
              return (
                <TableRow key={n._id}>
                  <TableCell numeric>
                    {new Date(n.dateCompleted).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{n.activity}</TableCell>
                  <TableCell numeric>{n.points}</TableCell>
                  <TableCell numeric>{n.url}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UserActivities.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserActivities);

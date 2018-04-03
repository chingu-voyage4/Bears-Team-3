import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import axios from 'axios';

import LeaderBoardHead from './LeaderBoardHead';

const styles = theme => ({
  root: {
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    marginTop: theme.spacing.unit * 3,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
  },
  table: {
    minWidth: 50,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class LeaderBoard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'totalPoints',
      selected: [],
      data: [].sort((a, b) => (a.totalPoints < b.totalPoints ? -1 : 1)),
    };
  }

  componentDidMount = () => {
    axios.get('/api/leaderboard').then(
      function(res) {
        this.setState({ data: res.data });
      }.bind(this)
    );
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    let data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy } = this.state;

    return (
      <div className="table">
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <LeaderBoardHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data.map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={n._id}>
                      <TableCell className={classes.root}>
                        <Link to={{ pathname: `/users/${n.userName}` }}>
                          {n.userName}
                        </Link>
                      </TableCell>
                      <TableCell className={classes.root} numeric>
                        {n.totalPoints}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaderBoard);

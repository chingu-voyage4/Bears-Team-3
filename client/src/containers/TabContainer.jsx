import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ marginBottom: '0px' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
};

export default TabContainer;

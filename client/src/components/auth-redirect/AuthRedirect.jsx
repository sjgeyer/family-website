import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../utils/routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, loggedIn } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (!loggedIn) {
      destinationRoute = routes.LANDING;
    } else if (pathname === routes.LANDING) {
      destinationRoute = routes.HOME;
    }

    return (
      <React.Fragment>
        { destinationRoute && <Redirect to={destinationRoute}/>}
      </React.Fragment>
    );
  }
}

AuthRedirect.propTypes = {
  loggedIn: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

export default connect(mapStateToProps)(AuthRedirect);

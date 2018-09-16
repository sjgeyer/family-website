import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes from '../../utils/routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, loggedIn } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (!loggedIn) {
      destinationRoute = routes.LANDING;
    }

    switch (pathname) {
      case routes.LANDING:
        if (loggedIn) destinationRoute = routes.HOME;
        break;
      case routes.CALENDAR:
        if (loggedIn) destinationRoute = routes.CALENDAR;
        else destinationRoute;
      default:
    }

    return (
      <React.Fragment>
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

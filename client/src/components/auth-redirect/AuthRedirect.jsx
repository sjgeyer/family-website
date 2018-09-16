import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import routes from '../../utils/routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (!token) {
      destinationRoute = routes.LANDING;
    }

    switch (pathname) {
      case routes.LANDING:
        if (token) destinationRoute = routes.HOME;
        break;
      case routes.CALENDAR:
        if (token) destinationRoute = routes.CALENDAR;
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
  token: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: !!state.token,
});

export default connect()(AuthRedirect);

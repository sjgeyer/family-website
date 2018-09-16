import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import { logout } from '../../actions/auth';

import './header.css';

const Header = () => (
  <header className="app-header">
    <h1 className="app-title">Erickson Family Website</h1>
    <nav>
      <Link to={routes.HOME}><li>Home</li></Link>
      <Link to={routes.CALENDAR}><li>Calendar</li></Link>
      <Link to={routes.LOGOUT}><li onClick={logout}>Log out</li></Link>
    </nav>
  </header>
);

export default Header;

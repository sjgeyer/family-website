import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';

const Header = () => (
  <header className="app-header">
    <h1 className="app-title">Erickson Family Website</h1>
    <nav>
      <Link to={routes.HOME}><li>Home</li></Link>
      <Link to={routes.CALENDAR}><li>Calendar</li></Link>
      <li>Log out</li>
    </nav>
  </header>
);

export default Header;

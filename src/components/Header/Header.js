import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import classes from './Header.scss'

export const Header = () => (
  <AppBar fixed flat>
    <a className={classes.homeLink} href="/">API Test Designer</a>
    <Navigation className={classes.nav} type="horizontal">
      <IndexLink to='/' className={classes.route} activeClassName={classes.activeRoute}>Tests</IndexLink>
      <Link to='/edit' className={classes.route} activeClassName={classes.activeRoute}>Create</Link>
    </Navigation>
  </AppBar>
)

export default Header

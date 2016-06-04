import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import classes from './Header.scss'

export const Header = () => (
  <AppBar fixed flat>
  <a className={classes.homeLink} href="/">API Test Designer</a>
  <Navigation className={classes.nav} type="horizontal">
  <IndexLink to='/' className={classes.route} activeClassName={classes.activeRoute}>
  Home
  </IndexLink>
  <Link to='/counter' className={classes.route} activeClassName={classes.activeRoute}>
  Counter
  </Link>
  </Navigation>
  </AppBar>
)

export default Header

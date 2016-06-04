import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './TreeView.scss'

export const TreeView = (props) => (
  <div className='box'>
  </div>
)

TreeView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default TreeView

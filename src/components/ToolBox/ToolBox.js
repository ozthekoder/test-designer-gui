import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './ToolBox.scss'

export const ToolBox = (props) => (
  <div className='content'>
  </div>
)

ToolBox.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default ToolBox

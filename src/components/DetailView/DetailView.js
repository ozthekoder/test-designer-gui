import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './DetailView.scss'

export const DetailView = (props) => (
  <div className='box'>
  </div>
)

DetailView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default DetailView

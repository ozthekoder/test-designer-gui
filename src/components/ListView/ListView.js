import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './ListView.scss'

export const ListView = (props) => (
  <div className='box'>
  </div>
)

ListView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default ListView

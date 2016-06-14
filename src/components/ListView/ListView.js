import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './ListView.scss'

class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  flatten(tree) {

  }

  render(){
    return (
      <div className='box'>
        <div className="column">

        </div>
      </div>
    )
  }
}
ListView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default ListView

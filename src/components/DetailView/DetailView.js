import React from 'react'
import config from '../../config'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input';
import classes from './DetailView.scss'

export const DetailView = (props) => {
  const path = props.inContext;
  const blueprint = props.blueprint.toJS();
  const context = !path.length ? blueprint : path.reduce((prev, current) => prev[current], blueprint)

  return (
    <div className='box'>
    <section>
    <Input type='text' label='Name' name='$name' value={context.$name} onChange={props.setOpName} />
    </section>
    </div>
  )
}

DetailView.propTypes = {
  inContext: React.PropTypes.array.isRequired,
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default DetailView

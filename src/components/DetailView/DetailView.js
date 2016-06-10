import React from 'react'
import config from '../../config'
import { debounce } from '../../util'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import classes from './DetailView.scss'
const { Defaults, plugins } = config

export const DetailView = (props) => {
  const path = props.inContext;
  const blueprint = props.blueprint
  const context = !path.length ? blueprint : path.reduce((prev, current) => prev.get(current), blueprint)
  const plugin = context.get('$plugin')
  const operations = plugin ? Object.keys(plugins[plugin]) : []
  const ops = operations
              .filter((k) => {
                return k[0] !== '$'
              })
              .map((k) => {
                return { label: k, value: k }
              })
  const dropdown = (plugin ? <Dropdown
        label='Operation'
        onChange={props.setOpAttribute.bind(null, '$op')}
        source={ops}
        allowBlank
        value={context.get('$op')}
      /> : null)

  return (
    <div className='box'>
      <section>
        <Input type='text' label='Name' name='$name' value={context.get('$name')} onChange={props.setOpAttribute.bind(null, '$name')} />
        <Input type='text' label='Log' name='$log' value={context.get('$log')} onChange={props.setOpAttribute.bind(null, '$log')} />
        {dropdown}
        <Switch
          checked={context.get('$skip')}
          label="Skip"
          onChange={props.setOpAttribute.bind(null, '$skip')}
        />
        <Switch
          checked={context.get('$halt')}
          label="Halt"
          onChange={props.setOpAttribute.bind(null, '$halt')}
        />

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

import React from 'react'
import config from '../../config'
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
  const op = context.get('$op')
  const operationsDropdown = (plugin ? <Dropdown
        label='Operation'
        onChange={props.setOpAttribute.bind(null, '$op')}
        source={ops}
        allowBlank
        value={op}
      /> : null)
  let args = [];
  if (op) {
    const currentOp = plugins[plugin][op]
    args = Object
    .keys(currentOp)
    .map((arg, i) => {
      const types = currentOp[arg].split('|')
      if (types.contains('object') || types.contains('array')) {
        return (
          <Input type='text' label={arg} name={arg} multiple={true} value={context.getIn(['$args', i])} onChange={props.setOpAttribute.bind(null, ['$args', i])} />
        )
      } else if (types.contains('string') || types.contains('number')) {
          return (
            <Input type='text' label={arg} name={arg} value={context.getIn(['$args', i])} onChange={props.setOpAttribute.bind(null, ['$args', i])} />
          )
      } else if(types.contains('boolean')) {
          return (
            <Switch
            checked={context.getIn(['$args', i])}
            label={arg}
            onChange={props.setOpAttribute.bind(null, ['$args', i])}
          />
          )
      }
    })
  }
  return (
    <div className='box'>
      <div className='column'>
        <section>
          <Input type='text' label='Name' name='$name' value={context.get('$name')} onChange={props.setOpAttribute.bind(null, '$name')} />
          <Input type='text' label='Log' name='$log' value={context.get('$log')} onChange={props.setOpAttribute.bind(null, '$log')} />
          {operationsDropdown}
          {args}
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
    </div>
  )
}

DetailView.propTypes = {
  inContext: React.PropTypes.array.isRequired,
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default DetailView

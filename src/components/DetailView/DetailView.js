import React from 'react'
import config from '../../config'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'
import Switch from 'react-toolbox/lib/switch'
import {Button} from 'react-toolbox/lib/button'
import {Tab, Tabs} from 'react-toolbox'
import classes from './DetailView.scss'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'
const { Defaults, plugins } = config

export class DetailView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payloadTabIndex: 0
    }
  }

  onPayloadTabChange(index) {
    this.setState({ payloadTabIndex: index })
  }
  onAceChange(path, v) {
    let val = v;
    try {
      val = JSON.parse(val)
    } catch(e) {}
    this.props.setOpAttribute(path, val)
  }

  render() {
    const path = this.props.inContext;
    const blueprint = this.props.blueprint
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
    const operationsDropdown = (
      plugin ? <Dropdown
      label='Operation'
      onChange={this.props.setOpAttribute.bind(null, '$op')}
      source={ops}
      allowBlank
      value={op}
      /> : null
    )
    let args = [];
    if (op) {
      const currentOp = plugins[plugin][op]
      args = Object
      .keys(currentOp)
      .map((arg, i) => {
        const types = currentOp[arg].split('|')
        if (types.includes('object') || types.includes('array')) {
          let currentVal = context.getIn(['$args', i])
          currentVal = typeof currentVal === 'object' ? JSON.stringify(currentVal, null, 2) : currentVal
          return (
            <div className={classes.argumentBox}>
            <label className={classes.argumentLabel}>{arg}</label>
            <AceEditor
            name={arg}
            minLines={20}
            maxLines={250}
            key={i}
            mode="json"
            theme="github"
            editorProps={{$blockScrolling: true}}
            value={currentVal}
            onChange={this.onAceChange.bind(this, ['$args', i])}
            />
            </div>
          )
        } else if (types.includes('string') || types.includes('number')) {
          return (
            <Input key={i} type='text' label={arg} name={arg} value={context.getIn(['$args', i])} onChange={this.props.setOpAttribute.bind(null, ['$args', i])} />
          )
        } else if(types.includes('boolean')) {
          return (
            <Switch
            key={i}
            checked={context.getIn(['$args', i])}
            label={arg}
            onChange={this.props.setOpAttribute.bind(null, ['$args', i])}
            />
          )
        }
      })
    }

    const payload = (
      <div className={classes.argumentBox}>
        <Tabs index={this.state.payloadTabIndex} onChange={this.onPayloadTabChange.bind(this)}>
        <Tab label='Payload'>
          <AceEditor
            name="payload"
            minLines={20}
            maxLines={250}
            mode="json"
            theme="github"
            editorProps={{$blockScrolling: true}}
          />
        </Tab>
        <Tab label='Assertions'>
        </Tab>
        <Tab label='References'>
        </Tab>
        </Tabs>
        </div>
    )
    return (
      <div className='box'>
      <div className='column'>
          <section>
            <Input type='text' label='Name' name='$name' value={context.get('$name')} onChange={this.props.setOpAttribute.bind(null, '$name')} />
            <Input type='text' label='Log' name='$log' value={context.get('$log')} onChange={this.props.setOpAttribute.bind(null, '$log')} />
            {operationsDropdown}
            {args}
            {payload}
            <Switch
            checked={context.get('$skip')}
            label="Skip"
            onChange={this.props.setOpAttribute.bind(null, '$skip')}
            />
            <Switch
            checked={context.get('$halt')}
            label="Halt"
            onChange={this.props.setOpAttribute.bind(null, '$halt')}
            />
          </section>
        </div>
      </div>
    )
  }
}
DetailView.propTypes = {
  inContext: React.PropTypes.array.isRequired,
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default DetailView

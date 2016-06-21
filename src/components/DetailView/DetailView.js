import React from 'react'
import Immutable from 'immutable'
import config from '../../config'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'
import Switch from 'react-toolbox/lib/switch'
import { Button, IconButton } from 'react-toolbox/lib/button'
import Chip from 'react-toolbox/lib/chip';
import {Tab, Tabs} from 'react-toolbox'
import { generateAssertions } from '../../util'
import classes from './DetailView.scss'
import chipTheme from './chip.scss'
import brace from 'brace'
import AceEditor from 'react-ace'
import { MdDelete } from 'react-icons/lib/md'
import 'brace/mode/json'
import 'brace/theme/github'
const { Defaults } = config

export class DetailView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payloadTabIndex: 0,
      payload : ''
    }
  }

  onPayloadTabChange(index) {
    this.setState({ payloadTabIndex: index })
  }

  updatePayload(payload) {
    this.setState({ payload })
  }

  onAceChange(path, v) {
    let val = v;
    try {
      val = JSON.parse(val)
    } catch(e) {}
    this.props.setOpAttribute(path, val)
  }

  generateAssertions() {
    const { payload } = this.state
    const assertions = generateAssertions(JSON.parse(payload));
    this.props.setOpAttribute(['$payload', '$expect'], Immutable.fromJS(assertions));
  }

  removeAssertion(path) {
    this.props.setOpAttribute(path, null);
  }

  render() {
    const path = this.props.inContext;
    const plugins = this.props.config.get('plugins');
    const blueprint = this.props.blueprint.asMutable()
    const context = !path.length ? blueprint : path.reduce((prev, current) => prev.get(current), blueprint)
    const plugin = context.get('$plugin')
    const operations = plugins.getIn([plugin, 'interface'], Immutable.Map());
    const ops = operations
    .filter((op, k) => {
      return k[0] !== '$'
    })
    .map((op, k) => {
      return { label: k, value: k }
    })

    const op = context.get('$op')
    const operationsDropdown = (
      plugin ? <Dropdown
      value={op}
      label='operation'
      onChange={this.props.setOpAttribute.bind(null, '$op')}
      source={ops.toList()}
      auto
      /> : null
    )
    let args = [];
    let payload = null

    if (op) {
      const currentOp = plugins.getIn([plugin, 'interface']).get(op)
      var i = -1;
      args = currentOp
      .map((tps, k) => {
        i = i + 1;
        const types = tps.split('|')
        if (types.includes('object') || types.includes('array')) {
          let currentVal = context.getIn(['$args', i])
          currentVal = typeof currentVal === 'object' ? JSON.stringify(currentVal, null, 2) : currentVal
          return (
            <div className={classes.argumentBox}>
            <label className={classes.argumentLabel}>{k}</label>
            <AceEditor
            name={k}
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
            <Input key={i} type='text' label={k} name={k} value={context.getIn(['$args', i])} onChange={this.props.setOpAttribute.bind(null, ['$args', i])} />
          )
        } else if(types.includes('boolean')) {
          return (
            <Switch
            key={i}
            checked={context.getIn(['$args', i])}
            label={k}
            onChange={this.props.setOpAttribute.bind(null, ['$args', i])}
            />
          )
        }
      })

      payload = (
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
              value={this.state.payload}
              onChange={this.updatePayload.bind(this)}
              />
            </Tab>
            <Tab label='Assertions'>
            <div>
              <Button onClick={this.generateAssertions.bind(this)} label='Regenerate' accent />
            </div>
            <div style={{ marginTop: '8px' }}>
              {
                context
                .getIn(['$payload', '$expect'], Immutable.List())
                .map((assertion, index) => {
                  return (
                    <Chip theme={chipTheme}>
                      {`${assertion.get('$path').join('.')} should be ${assertion.get('$assert')} to ${assertion.get('$value')}`}
                      <IconButton onClick={this.removeAssertion.bind(this, ['$payload', '$expect', index])} icon={<MdDelete size="24" />} />
                    </Chip>
                  )
              })
              }
            </div>
            </Tab>
            <Tab label='References'>
            </Tab>
          </Tabs>
        </div>
      )

    }

    return (
      <div className='box'>
      <div className='column'>
          <section>
            <Input type='text' label='name' name='$name' value={context.get('$name')} onChange={this.props.setOpAttribute.bind(null, '$name')} />
            <Input type='text' label='log' name='$log' value={context.get('$log')} onChange={this.props.setOpAttribute.bind(null, '$log')} />
            {operationsDropdown}
            {args}
            {payload}
            <Input type='text' label='repeat' name='$repeat' value={context.get('$repeat')} onChange={this.props.setOpAttribute.bind(null, '$repeat')} />
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
            <Switch
            checked={context.get('$lookup')}
            label="Lookup"
            onChange={this.props.setOpAttribute.bind(null, '$lookup')}
            />
          </section>
        </div>
      </div>
    )
  }
}

DetailView.propTypes = {
  inContext: React.PropTypes.array.isRequired,
  blueprint: React.PropTypes.object.isRequired
}

export default DetailView

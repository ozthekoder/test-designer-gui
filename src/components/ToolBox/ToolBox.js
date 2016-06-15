import React from 'react'
import classes from './ToolBox.scss'
import Link from 'react-toolbox/lib/link'
import Dialog from 'react-toolbox/lib/dialog'
import Switch from 'react-toolbox/lib/switch'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'
import { FaDownload } from 'react-icons/lib/fa'
import { MdSettingsApplications } from 'react-icons/lib/md'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'

class ToolBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      configModalActive: false,
      newPlugin: ''
    }
  }

  toggleConfigModal() {
    const active = this.state.configModalActive
    this.setState({ configModalActive: !active })
  }

  updateNewPlugin(newPlugin) {
    this.setState({
      newPlugin
    })
  }

  addPlugin() {
    this.props.addPlugin(JSON.parse(this.state.newPlugin));
  }
  render() {
    const newPluginEditor = (
      <div>
            <h3>New Plugin <Button onClick={this.addPlugin.bind(this)} style={{ 'float': 'right', margin: '4px' }} icon='add' label='Add' accent />
</h3>
            <AceEditor
            name="new_plugin"
            minLines={20}
            maxLines={250}
            mode="json"
            theme="github"
            editorProps={{$blockScrolling: true}}
            value={this.state.newPlugin}
            onChange={this.updateNewPlugin.bind(this)}
            />
      </div>
    )

    return (
      <div className='column'>
      <Link style={{ margin: '1rem 0 0 1rem' }} icon={<FaDownload size="32"/>} href={`data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(this.props.blueprint.toJS(), null, 2))}`} download={`test_bp_${this.props.blueprint.get('$id')}.json`} />
      <Link style={{ margin: '1rem 0 0 1rem' }} icon={<MdSettingsApplications size="32" />} href="" onClick={(e) => { e.preventDefault(); this.toggleConfigModal() }}/>
       <Dialog
          actions={[
              { label: "Close", onClick: this.toggleConfigModal.bind(this) }
            ]}
          active={this.state.configModalActive}
          onEscKeyDown={this.toggleConfigModal.bind(this)}
          onOverlayClick={this.toggleConfigModal.bind(this)}
          title='Configuration'
        >
        <section>
        <h2>Plugins</h2>
          {
            this.props.plugins.map((plugin, key) =>
              <Switch
                checked={plugin.get('$active')}
                label={key}
                onChange={this.props.togglePlugin.bind(null, key)}
              />
            )
          }
          {newPluginEditor}
        </section>
        </Dialog>
      </div>
    )
  }
}

ToolBox.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default ToolBox

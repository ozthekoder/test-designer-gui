import React from 'react'
import classes from './ToolBox.scss'
import Link from 'react-toolbox/lib/link'
import Dialog from 'react-toolbox/lib/dialog'
import Switch from 'react-toolbox/lib/switch'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'
import { FaDownload, FaUpload } from 'react-icons/lib/fa'
import { MdSettingsApplications, MdSave } from 'react-icons/lib/md'
import { save } from '../../util'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'

class ToolBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      configModalActive: false,
      uploadModalActive: false,
      newPlugin: '',
      uploadedJSON: ''
    }
  }

  toggleConfigModal() {
    const active = this.state.configModalActive
    this.setState({ configModalActive: !active })
  }

  toggleUploadModal() {
    const active = this.state.uploadModalActive
    this.setState({ uploadModalActive: !active })
  }

  updateNewPlugin(newPlugin) {
    this.setState({
      newPlugin
    })
  }

  updateUploadedJSON(uploadedJSON) {
    this.setState({
      uploadedJSON
    })
  }

  addPlugin() {
    this.props.addPlugin(JSON.parse(this.state.newPlugin));
  }

  uploadBlueprint() {
    this.props.uploadJSON(JSON.parse(this.state.uploadedJSON));
  }

  saveBlueprint() {
    save(this.props);
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

    const pluginConfigs = this.props.config
    .get('plugins')
    .map((plugin, key) => (
      <div>
      <h2>{key}</h2>
      {
        plugin
        .filter((p, key) => key !== 'file')
        .filter((p, key) => key !== 'topics')
        .filter((p, key) => key !== 'interface')
        .map((val, k) => (
          <Input type='text' label={k} name={`${key}.${k}`} value={val} onChange={this.props.updateConfig.bind(null, ['plugins', key, k])} />
        ))

      }
      </div>

    ))

    return (
      <div className='column'>
      <Link style={{ margin: '1rem 0 0 1rem' }} icon={<FaDownload size="32"/>} href={`data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify({ config: this.props.config.toJS(), test: this.props.blueprint.toJS()}, null, 2))}`} download={`test_bp_${this.props.blueprint.get('$id')}.json`} />
      <Link style={{ margin: '1rem 0 0 1rem' }} icon={<FaUpload size="32" />} href="" onClick={(e) => { e.preventDefault(); this.toggleUploadModal() }}/>
      <Link style={{ margin: '1rem 0 0 1rem' }} icon={<MdSave size="32" />} href="" onClick={(e) => { e.preventDefault(); this.saveBlueprint() }}/>
      <Dialog
      name="upload_json"
      actions={
            [
              { label: "Done", onClick: this.toggleUploadModal.bind(this) }
            ]
          }
          active={this.state.uploadModalActive}
          onEscKeyDown={this.toggleUploadModal.bind(this)}
          onOverlayClick={this.toggleUploadModal.bind(this)}
          title='Upload Blueprint'
        >
        <section>
          <div>
          <Button onClick={this.uploadBlueprint.bind(this)} label='Upload' accent />
          </div>
          <AceEditor
            name="new_plugin"
            minLines={20}
            maxLines={250}
            mode="json"
            theme="github"
            editorProps={{$blockScrolling: true}}
            value={this.state.uploadedJSON}
            onChange={this.updateUploadedJSON.bind(this)}
          />
        </section>
      </Dialog>
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
            this.props.config
            .get('plugins')
            .map((plugin, key) =>
              <Switch
                checked={plugin.get('active')}
                label={key}
                onChange={this.props.togglePlugin.bind(null, key)}
              />
            )
          }
          {newPluginEditor}
          {pluginConfigs}
        </section>
        </Dialog>
      </div>
    )
  }
}

ToolBox.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  config: React.PropTypes.object.isRequired,
}

export default ToolBox

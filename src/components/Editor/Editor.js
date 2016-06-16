import React from 'react'
import classes from './Editor.scss'
import TreeView from '../TreeView'
import Immutable from 'immutable'
import ListView from '../ListView'
import DetailView from '../DetailView'
import ToolBox from '../ToolBox'
import uuid from 'uuid'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import Dialog from 'react-toolbox/lib/dialog'
import lookupTheme from './lookup.scss'
import { getLookupList, copyFrom } from '../../util'

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const lookupList = getLookupList([], props.blueprint).toJS();
    this.state = {
      lookupModalActive: false,
      lookupResult: '',
      lookupList,
      path: []
    }
  }

  closeLookupModal() {
    this.setState({
      lookupModalActive: false
    })
  }

  openLookupModal(path, e) {
    const { blueprint } = this.props;
    const currentId = blueprint.get('$id');
    let lookupMap = Immutable.fromJS(JSON.parse(localStorage.getItem('operations')));
    const lookupList = {}

    lookupMap.forEach((v, k) => {
      lookupList[k] = v.get('$name');
    });

    this.setState({
      lookupModalActive: true,
      lookupList,
      path
    })
  }

  addFromLookUp(value) {
    const bp = this.props.blueprint;
    let lookupMap = Immutable.fromJS(JSON.parse(localStorage.getItem('operations')));
    console.log('VALUE', value);
    const op = lookupMap.get(value);
    this.props.copyNode(this.state.path, copyFrom(op));
    this.closeLookupModal();
  }

  render(){
    return (
      <div className='box'>
        <div className='box right-shadow' style={{ width: '48px' }}>
          <ToolBox { ...this.props } />
        </div>
        <div className='box' style={{ width: 'calc(100% - 48px)' }}>
          <div className={classes.treeColumn}>
            <TreeView {...this.props}  openLookupModal={this.openLookupModal.bind(this)}/>
          </div>
          <div className={classes.listColumn} >
            <ListView { ...this.props } />
          </div>
          <div className={classes.detailColumn}>
            <DetailView { ...this.props } />
          </div>
        </div>
        <Dialog
          theme={lookupTheme}
          name="lookup"
          active={this.state.lookupModalActive}
          onEscKeyDown={this.closeLookupModal.bind(this)}
          onOverlayClick={this.closeLookupModal.bind(this)}
        >
          <Autocomplete
            direction="down"
            label="Lookup & Copy"
            onChange={this.addFromLookUp.bind(this)}
            source={this.state.lookupList}
            value={this.state.lookupResult}
            multiple={false}
          />
        </Dialog>
      </div>
    )
  }
}

Editor.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  inContext: React.PropTypes.array.isRequired,
  plugins: React.PropTypes.object.isRequired,
  addNewNode: React.PropTypes.func.isRequired
}

export default Editor

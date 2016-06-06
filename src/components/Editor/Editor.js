import React from 'react'
import Button from 'react-toolbox/lib/button'
import classes from './Editor.scss'
import TreeView from '../TreeView'
import ListView from '../ListView'
import DetailView from '../DetailView'
import ToolBox from '../ToolBox'

export const Editor = (props) => (
  <div className='box'>
    <div className='box right-shadow' style={{ width: '48px' }}>
      <ToolBox { ...props } />
    </div>
    <div className='box' style={{ width: 'calc(100% - 48px)' }}>
      <div className={classes.treeColumn}>
        <TreeView { ...props } />
      </div>
      <div className={classes.listColumn} >
        <ListView { ...props } />
      </div>
      <div className={classes.detailColumn}>
        <DetailView { ...props } />
      </div>
    </div>
  </div>
)

Editor.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default Editor

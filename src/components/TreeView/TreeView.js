import React from 'react'
import classes from './TreeView.scss'
import TreeNode from '../TreeNode';

export const TreeView = (props) => (
  <div className='box'>
    <TreeNode blueprint={props.blueprint} isRoot={true}/>
  </div>
)

TreeView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default TreeView

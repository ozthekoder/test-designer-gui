import React from 'react'
import classes from './TreeView.scss'
import TreeNode from '../TreeNode';

export const TreeView = (props) => (
  <div className='box'>
    <TreeNode isRoot={true} blueprint={props.blueprint} plugins={props.plugins} />
  </div>
)

TreeView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default TreeView

import React from 'react'
import classes from './TreeView.scss'
import TreeNode from '../TreeNode';

export const TreeView = (props) => (
  <div className='column'>
    <TreeNode path={[]} isRoot={true} {...props} />
  </div>
)

TreeView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  inContext: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  addNewNode: React.PropTypes.func.isRequired
}

export default TreeView

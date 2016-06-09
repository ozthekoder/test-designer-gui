import React from 'react'
import classes from './TreeView.scss'
import TreeNode from '../TreeNode';

export const TreeView = (props) => (
  <div className='column'>
    <TreeNode {...props} path={[]} isRoot={true} />
  </div>
)

TreeView.propTypes = {
}

export default TreeView

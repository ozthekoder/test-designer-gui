import React from 'react'
import classes from './TreeNode.scss'
import AddOpMenu from '../AddOpMenu'
const recursive = [
  '$before',
  '$beforeEach',
  '$ops',
  '$afterEach',
  '$after'
]
export const TreeNode = (props) => {
  const { blueprint, isRoot } = props;
  let tree;
  tree = (
    <li className={classes.branch}>
    <label htmlFor={blueprint.$id}>{blueprint.$name}</label>
    <input type="checkbox" id={blueprint.$id} />
    <ol>
    {
      recursive
      .map((k, j) => {
        const ops = blueprint[k] || [];
        console.log(`${blueprint.$id}.${k}`)
        return (
          <li type={k} className={classes.branch} key={j}>
            <label htmlFor={`${blueprint.$id}.${k}`}>{k}</label>
            <input type="checkbox" id={`${blueprint.$id}.${k}`} />
            <AddOpMenu addNewNode={props.addNewNode} parentId={blueprint.$id} collection={k} plugins={props.plugins}/>
            <ol>
              { ops.map((op, i) => <TreeNode blueprint={op} key={i} isRoot={false} />) }
            </ol>
          </li>
        )
      })
    }
    </ol>
    </li>
  )

  if (isRoot) {
    tree = (
      <ol className="tree">
      {tree}
      </ol>
    )
  }

  return tree;
}

TreeNode.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
}

export default TreeNode

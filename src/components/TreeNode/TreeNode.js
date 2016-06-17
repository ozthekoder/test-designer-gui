import React from 'react'
import classes from './TreeNode.scss'
import {Button, IconButton} from 'react-toolbox/lib/button'
import { MdHighlightRemove } from 'react-icons/lib/md'
import AddOpMenu from '../AddOpMenu'
const recursive = [
  '$before',
  '$beforeEach',
  '$ops',
  '$afterEach',
  '$after'
]
export const TreeNode = (props) => {
  const { openLookupModal, blueprint, isRoot, path, addNewNode, setOpAttribute, plugins, inContext, setContext, removeNode } = props;
  let tree;
  tree = (
    <li type="$op" onClick={(e) => { e.stopPropagation(); setContext(path) }} className={classes.branch}>
      <label htmlFor={[...path, blueprint.get('$id')].join('.')}>
        {blueprint.get('$name')}
        {
          !isRoot ? <MdHighlightRemove size="16" style={ { 'float': 'right'  } } onClick={(e) => {e.stopPropagation(); console.log(path); removeNode(path)}}/> : null
        }
        </label>
      <input type="checkbox" id={[...path, blueprint.get('$id')].join('.')} />
      <ol>
      {
      recursive
      .filter(k => !!blueprint.get(k))
      .map((k, j) => {
        const ops = blueprint.get(k) || [];
        const newPath = [...path, k]
        return (
          <li type={k} className={classes.branch} key={j}>
            <label htmlFor={newPath.join('.')}>{k}</label>
            <input type="checkbox" id={newPath.join('.')} />
            <AddOpMenu
              openLookupModal={openLookupModal}
              parentId={blueprint.get('$id')}
              path={newPath}
              addNewNode={addNewNode}
              collection={k}
              plugins={plugins}
              />
            <ol>
              {
                 ops.map((op, i) => <TreeNode
                                    path={[...newPath, i]}
                                    removeNode={removeNode}
                                    openLookupModal={openLookupModal}
                                    inContext={inContext}
                                    plugins={plugins}
                                    blueprint={op}
                                    key={i}
                                    isRoot={false}
                                    addNewNode={addNewNode}
                                    setOpAttribute={setOpAttribute}
                                    setContext={setContext}
                                    />)
              }
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
      <ol className={classes.tree}>
      {tree}
      </ol>
    )
  }

  return tree;
}

TreeNode.propTypes = {
  isRoot: React.PropTypes.bool.isRequired,
  inContext: React.PropTypes.array.isRequired,
  plugins: React.PropTypes.object.isRequired,
  blueprint: React.PropTypes.object.isRequired,
  addNewNode: React.PropTypes.func.isRequired
}

export default TreeNode

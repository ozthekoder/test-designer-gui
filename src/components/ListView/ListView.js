import React from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Immutable from 'immutable'
import classes from './ListView.scss'

class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  flatten(path=[], tree) {
    let before = tree
    .get('$before')
    .map((op, index) =>{
      return this.flatten([...path, '$before', index], op)
    })

    if(before.size > 0) {
      before = before.reduce((prev, next) => prev.concat(next))
    }


    let after = tree
    .get('$after')
    .map((op, index) =>{
      return this.flatten([...path, '$after', index], op)
    })
    if(after.size > 0) {
      after = after.reduce((prev, next) => prev.concat(next))
    }


    let beforeEach = tree
    .get('$beforeEach')
    .map((op, index) =>{
      return this.flatten([...path, '$beforeEach', index], op)
    })
    if(beforeEach.size > 0) {
      beforeEach = beforeEach.reduce((prev, next) => prev.concat(next))
    }



    let afterEach = tree
    .get('$afterEach')
    .map((op, index) =>{
      return this.flatten([...path, '$afterEach', index], op)
    })
    if(afterEach.size > 0) {
      afterEach = afterEach.reduce((prev, next) => prev.concat(next))
    }


    let ops;
    if(tree.has('$ops')) {
      ops = tree
      .get('$ops', Immutable.List())
      .map((op, index) =>{
        return this.flatten([...path, '$ops', index], op)
      })
      .map((op) => {
        return beforeEach.concat(op).concat(afterEach)
      })
      ops = ops.reduce((prev, next) => prev.concat(next), Immutable.List())
    } else {
      ops = beforeEach
      .concat(Immutable.List([tree.set('$path', path)]))
      .concat(afterEach)
    }

    let fin = before.concat(ops).concat(after);
    const repeat = tree.get('$repeat');
    let i;

    for(i=0; i < repeat; i++) {
      fin = fin.concat(fin);
    }

    return fin;
  }

  render(){
    const flat = this.flatten([], this.props.blueprint)
    let i=-1;
    return (
      <div className='box'>
        <div className="column">
        <List selectable ripple>
        {
          flat
         .map((op, i) => <span><ListItem key={++i} onClick={this.props.setContext.bind(null, op.get('$path'))} caption={op.get('$name')} legend={`${op.get('$plugin')}.${op.get('$op')}`} /><ListDivider /></span>)
        }
        </List>
        </div>
      </div>
    )
  }
}
ListView.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default ListView

import React from 'react'
import Button from 'react-toolbox/lib/button';
import classes from './Editor.scss'
import TreeView from '../TreeView'
import ListView from '../ListView'
import DetailView from '../DetailView'

export const Editor = (props) => (
  <div className='box'>
    <div className='container' style={{ width: '40%' }}>
      <TreeView { ...props } />
    </div>
    <div className='container' style={{ width: '20%' }}>
      <ListView { ...props } />
    </div>
    <div className='container' style={{ width: '40%' }}>
      <DetailView { ...props } />
    </div>
  </div>
)

Editor.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
  logDefaultPlugins: React.PropTypes.func.isRequired
}

export default Editor

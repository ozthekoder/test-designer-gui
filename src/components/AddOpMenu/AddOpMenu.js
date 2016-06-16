import React from 'react'
import classes from './AddOpMenu.scss'
import mItemTheme from './theme.scss'
import {Button, IconButton} from 'react-toolbox/lib/button'
import { MdAddCircle, MdDone, MdDoneAll } from 'react-icons/lib/md'
import { FaSearchPlus } from 'react-icons/lib/fa'
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu'

export const AddOpMenu = (props) => {
  const { path, parentId, openLookupModal, collection, addNewNode, plugins } = props;
  let i=0;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <IconMenu key={0} onSelect={addNewNode} icon={<MdAddCircle size="14"/>} position='auto' menuRipple>
      {
        plugins
        .filter((p) => !!p.get('$active'))
        .map((val, type) => <MenuItem key={i++} theme={mItemTheme} value={{ path, type }} icon={<MdDone size="16"/>} caption={type} />)
      }
      <MenuItem theme={mItemTheme} value={{ type: 'multiple', path }} icon={<MdDoneAll size="14"/>} caption='multiple' />
      </IconMenu>
      <IconButton onClick={openLookupModal.bind(null, path)} style={{ padding: '0px', marginLeft: '-12px' }} icon={<FaSearchPlus size={16}/>} />

    </div>
  )
}

AddOpMenu.propTypes = {
  parentId: React.PropTypes.string.isRequired,
  collection: React.PropTypes.string.isRequired,
  plugins: React.PropTypes.object.isRequired,
  addNewNode: React.PropTypes.func.isRequired
}

export default AddOpMenu

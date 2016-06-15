import React from 'react'
import classes from './AddOpMenu.scss'
import mItemTheme from './theme.scss'
import { MdAddCircle, MdDone, MdDoneAll } from 'react-icons/lib/md'
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu'

export const AddOpMenu = (props) => {
  const { path, parentId, collection, addNewNode, plugins } = props;
  let i=0;

  return (
    <IconMenu key={0} onSelect={addNewNode} icon={<MdAddCircle size="14"/>} position='auto' menuRipple>
    {
      plugins
      .filter((p) => !!p.get('$active'))
      .map((val, type) => <MenuItem key={i++} theme={mItemTheme} value={{ path, type }} icon={<MdDone size="16"/>} caption={type} />)
    }
    <MenuItem theme={mItemTheme} value={{ type: 'multiple', path }} icon={<MdDoneAll size="14"/>} caption='multiple' />
    </IconMenu>
  )
}

AddOpMenu.propTypes = {
  parentId: React.PropTypes.string.isRequired,
  collection: React.PropTypes.string.isRequired,
  plugins: React.PropTypes.object.isRequired,
  addNewNode: React.PropTypes.func.isRequired
}

export default AddOpMenu

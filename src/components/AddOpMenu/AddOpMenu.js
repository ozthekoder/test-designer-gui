import React from 'react'
import classes from './AddOpMenu.scss'
import mItemTheme from './theme.scss'
import { MdAddCircle, MdDone, MdDoneAll } from 'react-icons/lib/md'
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu'

export const AddOpMenu = (props) => {
  console.log(props);
  return (
    <IconMenu onSelect={props.addNewNode} icon={<MdAddCircle size="16"/>} position='auto' menuRipple>
    {
      Object
      .keys(props.plugins)
      .map((p) => <MenuItem theme={mItemTheme} value={props.plugins[p]} icon={<MdDone size="16"/>} caption={p} />)
    }
      <MenuItem theme={mItemTheme} value='multiple' icon={<MdDoneAll size="16"/>} caption='multiple' />
    </IconMenu>
  )
}

AddOpMenu.propTypes = {
  plugins: React.PropTypes.object.isRequired,
}

export default AddOpMenu

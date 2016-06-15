import React from 'react'
import classes from './ToolBox.scss'
import Link from 'react-toolbox/lib/link'
import { FaDownload } from 'react-icons/lib/fa'
import { MdSettingsApplications } from 'react-icons/lib/md'
export const ToolBox = (props) => (
  <div className='content'>
    <Link icon={<FaDownload size="24"/>} href={`data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(props.blueprint.toJS(), null, 2))}`} download={`test_bp_${props.blueprint.get('$id')}.json`} />
  </div>
)

ToolBox.propTypes = {
  blueprint: React.PropTypes.object.isRequired,
  plugins: React.PropTypes.object.isRequired,
}

export default ToolBox

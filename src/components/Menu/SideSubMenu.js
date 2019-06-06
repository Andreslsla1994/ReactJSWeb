import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function SideSubMenu(props) {
  const {menuArray,module} = props
  const [toggle, setToggle] = useState(false);
  return (
    <li onClick={() => setToggle(!toggle)}>
        <div className="main-menu">
            <i className={` ${toggle ? 'fas fa-arrow-circle-down':'fas fa-arrow-circle-right' }`}></i>
            <Link 
            to="#"
            data-toggle="collapse"
            aria-expanded={toggle} 
            className={` ${toggle ? '':'collapsed' }`}>{module}</Link>
        </div>
        <ul 
        className={`list-unstyled collapse ${toggle ? 'show':''}`} 
        id="homeSubmenu">
            {
                menuArray.map(menu => (
                    <li key={menu.Descripcion}>
                        <Link  to={menu.Path}>{menu.Descripcion}</Link>
                    </li>
                ))
            }
        </ul>
    </li>
  )
}

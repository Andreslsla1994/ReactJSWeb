import React from 'react'
import {Link} from 'react-router-dom'
import SideSubMenu from './SideSubMenu'

export default function SideMenu (props){
  const{menus,handleLogOut} = props
  let menu = []
  Object.keys(menus).forEach(function(key) {
    menu.push(<SideSubMenu key={key} module={key} menuArray={menus[key]}/>)
  })
  if(menu.length === 0){
    menu.push(
      <li key={0}>
        <div className="main-menu">
        <Link to="#">No existe atribuciones para este usuario</Link>
        </div>
    </li>
    )
  }else{
    menu.push(
      <li key={0}>
        <div className="main-menu">
        <Link to="#" onClick={handleLogOut}>Log Out</Link>
        </div>
    </li>
    )
  }
  return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Cabecera</h3>
        </div>
        <div className="sidebar-options">
          <ul>
            {
              menu
            }
          </ul>
        </div>
      </nav>
  )
}


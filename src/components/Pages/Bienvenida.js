import React from 'react'
import {Link} from 'react-router-dom'

export default function Bienvenida() {
  return (
    <div id="content">
      Bienvenida
      <Link to="/Home/Ingreso">Ingreso</Link>
    </div>
  )
}

import React from 'react'
import { NavBarProps } from './NavBar.type'
import './NavBar.scss'

export function Navbar(props: NavBarProps) {

  const {
    logo,
    title = 'Aplicacion'
 } = props;

  return (
    <div className="navbar-container">
      <div className="navbar-container__main">
        <img
        src={logo}
        />
        <div className="navbar-container__main__title">
          <span> { title } </span>
        </div>
      </div>
    </div>
  )
}

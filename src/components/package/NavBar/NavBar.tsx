import React from 'react'
import { NavBarProps } from '@packageTypes'
import './NavBar.scss'

export function NavBar(props: NavBarProps) {
  // test
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
        {/* <div className="navbar-container__main__title">
          <span> { title } </span>
        </div> */}
      </div>
    </div>
  )
}

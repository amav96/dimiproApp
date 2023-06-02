import React from "react";
import { NavBarProps } from "@packageTypes";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

export function NavBar(props: NavBarProps) {
  const { logo, title = "Aplicacion" } = props;

  const navigate = useNavigate( )

  return (
    <nav className="navbar-container">
      <div className="navbar-container__main">
        <img src={logo} onClick={() => navigate('/')} />
        {/* <div className="navbar-container__main__title">
          <span> { title } </span>
        </div> */}
      </div>
    </nav>
  );
}

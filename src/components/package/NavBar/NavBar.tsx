import { NavBarProps } from "@packageTypes";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import menu from "./menu.svg";
import menuClose from "./close-menu.svg";

export function NavBar(props: NavBarProps) {
  const { logo, title = "Aplicacion", displayMenu, setDisplayMenu  } = props;

  const navigate = useNavigate();

  const handleMenu = () => {
    if(setDisplayMenu){
      setDisplayMenu(!displayMenu)
    }
    console.log('click menu')
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container__main">
        <img src={logo} onClick={() => navigate("/")} />
        { !displayMenu ? 
          <img
            src={menu}
            onClick={handleMenu}
            className="navbar-menu__icon"
          />
         : (
          <img
            src={menuClose}
            onClick={handleMenu}
            className="navbar-menu__icon"
          />
        ) }
      </div>
    </nav>
  );
}

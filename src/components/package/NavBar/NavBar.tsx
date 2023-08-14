import { NavBarProps } from "@packageTypes";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import menu from "./menu.svg";
import menuClose from "./close-menu.svg";
import { useMenu } from "../../../context/MenuContext";

export function NavBar(props: NavBarProps) {
  const { logo, title = "Aplicacion" } = props;

  const { showSidebar, setShowSidebar } = useMenu();

  const navigate = useNavigate();

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container__main">
        <img src={logo} onClick={() => navigate("/")} />
        {showSidebar ? (
          <img
            src={menu}
            onClick={handleShowSidebar}
            className="navbar-menu__icon"
          />
        ) : (
          <img
            src={menuClose}
            onClick={handleShowSidebar}
            className="navbar-menu__icon"
          />
        )}
      </div>
    </nav>
  );
}

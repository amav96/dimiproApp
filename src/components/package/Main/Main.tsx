import { useLocation, useNavigate } from "react-router-dom";
import baseApiUrl from "../../../services/BaseApiUrl";
import { Router } from "../../../../src/router";
import { SideBar } from "../SideBar";
import { NavBar } from "../NavBar";

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPath = location.pathname === "/login";
  const isForgotPasswordPath = location.pathname === "/forgot-password";

  const shouldShowSideBar = !isLoginPath && !isForgotPasswordPath;

  const menu = {
    top: [
      {
        title: "Home",
        image: baseApiUrl + "/icons/Home.svg",
        visible: true,
        name: "dashboard",
        path: "/",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Lista de contratos",
        image: baseApiUrl + "/icons/lista.svg",
        visible: true,
        
      },
      {
        title: "Agregar contrato",
        image: baseApiUrl + "/icons/circulo_sumar.svg",
        visible: true,
        name: "addContract",
        path: "/add-contract",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Ajustes",
        image: baseApiUrl + "/icons/ajustes.svg",
        visible: true,
        subSection: [
          {
            title: "Usuarios",
            image: baseApiUrl + "/icons/lista.svg",
            path: "/users",
            onNavigate: (data: any) => {
              console.log('hello', data)
              navigate(data.path);
            },
          },
        ],
      },
    ],
    above: [
      {
        title: "Perfil",
        image: baseApiUrl + "/icons/perfil.svg",
        visible: true,
        name: "profile",
        path: "/profile",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Cerrar sesión",
        image: baseApiUrl + "/icons/logout.svg",
        visible: true,
        name: "logout",
        path: "/login",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
    ],
  };

  return (
    <>
      <NavBar
        logo={
          "https://www.dimiproworld.com/wp-content/uploads/2018/10/adventure_logo_1-dimiopro.png"
        }
        title="Corporation"
      />
      {shouldShowSideBar && (
        <div className="AppMain">
          <div className="AppMain__layer">
            <SideBar menu={menu} colorTextItem="#fff" />
            <main className="AppMain__layer__PageAndTopBar">
              <div className="HomePageContent">
                <div
                  className="Scrollable--vertical
                HomePageContent__contentContainer"
                >
                  <Router />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
      {!shouldShowSideBar && <Router />}
    </>
  );
}

export default MainPage;

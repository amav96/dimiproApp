import { useNavigate } from "react-router-dom";
import baseApiUrl from "../../../services/BaseApiUrl";
import { Router } from "../../../../src/router";
import { SideBar } from "../SideBar";
import { NavBar } from "../NavBar";

function MainPage() {
  const navigate = useNavigate();

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
        subSection: [
          {
            title: "Cerrados",
            image: baseApiUrl + "/icons/lista.svg",
          },
          {
            title: "Abiertos",
            image: baseApiUrl + "/icons/lista.svg",
          },
          {
            title: "Inactivos",
            image: baseApiUrl + "/icons/lista.svg",
          },
        ],
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
        title: "Lista de cargas",
        image: baseApiUrl + "/icons/ajustes.svg",
        visible: true,
        name: "charges",
        path: "/charges",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Agregar carga",
        image: baseApiUrl + "/icons/machine.svg",
        visible: true,
        name: "addCargo",
        path: "/add-cargo",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Tracking de cargas",
        image: baseApiUrl + "/icons/exclamacion.svg",
        visible: true,
        name: "tracking",
        path: "/tracking",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      },
      {
        title: "Usuarios",
        image: baseApiUrl + "/icons/perfil.svg",
        visible: true,
        name: "users",
        path: "/users",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
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
        path: "/logout",
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
    </>
  );
}

export default MainPage;

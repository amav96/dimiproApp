import { useLocation, useNavigate } from "react-router-dom";
import baseApiUrl from "../services/BaseApiUrl";
import { Router } from "../router";
import { SideBar } from "../components/package/SideBar";
import { NavBar } from "../components/package/NavBar";
import usePermissions from '@hooks/usePermissions';
import { Menu } from "@packageTypes";

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
    const { hasPermissions } = usePermissions();

  const isLoginPath = location.pathname === "/login";
  const isForgotPasswordPath = location.pathname === "/forgot-password";

  const shouldShowSideBar = !isLoginPath && !isForgotPasswordPath;

  const getMenu = () : Menu => {

    const menu: Menu = {
      top: [
        {
          title: "Home",
          image: baseApiUrl + "/icons/home-gray.svg",
          visible: true,
          name: "dashboard",
          path: "/",
          onNavigate: (data: any) => {
            navigate(data.path);
          },
        },
        {
          title: "Contracts list",
          image: baseApiUrl + "/icons/lista-gray.svg",
          visible: true,
          name: "listContracts",
          path: "/list-contracts",
          onNavigate: (data: any) => {
            navigate(data.path);
          }
        }
        
      ],
      above: [
        {
          title: "Profile",
          image: baseApiUrl + "/icons/perfil-gray.svg",
          visible: true,
          name: "profile",
          path: "/profile",
          onNavigate: (data: any) => {
            navigate(data.path);
          },
        },
        {
          title: "Logout",
          image: baseApiUrl + "/icons/logout-gray.svg",
          visible: true,
          name: "logout",
          path: "/logout",
          onNavigate: (data: any) => {
            navigate(data.path);
          },
        },
      ],
    };

    if(hasPermissions('contracts_all')){
      menu.top.push({
        title: "Agregar contrato",
        image: baseApiUrl + "/icons/Agregar-gray.svg",
        visible: true,
        name: "addContract",
        path: "/add-contract",
        onNavigate: (data: any) => {
          navigate(data.path);
        },
      })
    }

    if(hasPermissions('settings_index')){
      menu.top.push({
        title: "Ajustes",
        image: baseApiUrl + "/icons/ajustes-gray.svg",
        visible: true,
        subSection: [
          {
            title: 'Calibers',
            image: baseApiUrl + "/icons/machine.svg",
            path: "/ajustes/calibers",
            onNavigate: (data: any) => {
              navigate(data.path);
              },
          },
          {
            title: 'Product Types',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/categories",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Companies',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/companies",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Currencies',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/currencies",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Packagings',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/packagings",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Payment Methods',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/paymentMethods",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Products',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/products",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Surveyors',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/surveyors",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Packagings',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/ajustes/packagings",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: "Users",
            image: baseApiUrl + "/icons/perfil-gray.svg",
            path: "/ajustes/users",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
        ],
      },)
    }
    return menu
  }

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
            <SideBar menu={getMenu()} colorTextItem="#fff" />
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

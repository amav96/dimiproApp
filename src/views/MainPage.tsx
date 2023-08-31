import { useLocation, useNavigate } from "react-router-dom";
import baseApiUrl from "../services/BaseApiUrl";
import { Router } from "../router";
import { SideBar } from "../components/package/SideBar";
import { NavBar } from "../components/package/NavBar";
import usePermissions from '@hooks/usePermissions';
import { Menu } from "@packageTypes";
import { useEffect, useState } from "react";
import useDataProvider from "@hooks/useDataProvider";

function MainPage() {
  const { getDataProviders } = useDataProvider();

  useEffect(() => {
    getDataProviders([
      "packagings",
      "paymentMethods",
      "surveyors",
      "currencies",
      "companies",
      "products",
      "calibers",
      "categories",
    ]);
  }, []);

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
        title: "Add Contract",
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
        title: "Settings",
        image: baseApiUrl + "/icons/ajustes-gray.svg",
        visible: true,
        subSection: [
          {
            title: 'Calibers',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/calibers",
            onNavigate: (data: any) => {
              navigate(data.path);
              },
          },
          {
            title: 'Product Types',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/categories",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Companies',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/companies",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Currencies',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/currencies",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Packagings',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/packagings",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Payment Methods',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/paymentMethods",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Products',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/products",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: 'Surveyors',
            image: baseApiUrl + "/icons/lista-gray.svg",
            path: "/settings/surveyors",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
          {
            title: "Users",
            image: baseApiUrl + "/icons/perfil-gray.svg",
            path: "/settings/users",
            onNavigate: (data: any) => {
              navigate(data.path);
            },
          },
        ],
      },)
    }
    return menu
  }

  const [sideBarDeployed, setSideBarDeployed] = useState<boolean>(false)

  return (
    <>
      <NavBar
        logo={
          "https://www.dimiproworld.com/wp-content/uploads/2018/10/adventure_logo_1-dimiopro.png"
        }
        title="Corporation"
        displayMenu={sideBarDeployed}
        shouldShowSideBar={shouldShowSideBar}
        setDisplayMenu={(value: boolean) => setSideBarDeployed(value)}
      />
      {shouldShowSideBar && (
        <div className="AppMain">
          <div className="AppMain__layer">
            <SideBar 
            menu={getMenu()} 
            getDeployed={(value: boolean) => setSideBarDeployed(value)}
            externalDeployed={sideBarDeployed}
            colorTextItem="#fff" 
            />
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

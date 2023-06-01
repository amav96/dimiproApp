import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { NavBar, SideBar } from "@package";
import baseApiUrl from "./services/BaseApiUrl";
import { useNavigate } from 'react-router-dom';

function App() {

  // const navigate = useNavigate();

  const menu = {
    top: [
        {
            title: 'Home',
            image: baseApiUrl + '/icons/Home.svg',
            visible : true,
            name: 'dashboard'
        },
        {
            title: 'Lista de contratos',
            image: baseApiUrl + '/icons/lista.svg',
            visible : true,
            subSection: [
                {
                    title: 'Cerrados',
                    image: baseApiUrl + '/icons/lista.svg',
                },
                {
                    title: 'Abiertos',
                    image: baseApiUrl + '/icons/lista.svg',
                },
                {
                    title: 'Inactivos',
                    image: baseApiUrl + '/icons/lista.svg',
                },
            ]
        },
        {
            title: 'Agregar contrato',
            image: baseApiUrl + '/icons/circulo_sumar.svg',
            visible : true
        },
        {
            title: 'Ajustes',
            image: baseApiUrl + '/icons/ajustes.svg',
            visible : true
        },
        {
            title: 'Usuarios',
            image: baseApiUrl + '/icons/perfil.svg',
            visible : true,
            name: 'users',
            onNavigate: (data: any) => {
              console.log(data)
            }
        },
        {
            title: 'Autoscoring',
            image: baseApiUrl + '/icons/machine.svg',
            visible : true
        },
        {
            title: 'Informes',
            image: baseApiUrl + '/icons/exclamacion.svg',
            visible : true
        },
    ],
    above: [
        {
            title: 'Perfil',
            image: baseApiUrl + '/icons/perfil.svg',
            visible : true,
            name: { name: 'Perfil'}
        },
        {
            title: 'Cerrar sesión',
            image: baseApiUrl + '/icons/logout.svg',
            visible : true,
            name: 'login'
        }
    ]
  }

  return (
      <div className="AppRoot-fullPage">
      <NavBar
      logo={'https://www.dimiproworld.com/wp-content/uploads/2018/10/adventure_logo_1-dimiopro.png'}
      title='Corporation'
      />
      <BrowserRouter>
        <div className="AppMain">
          <div className="AppMain__layer">
            <SideBar
            menu={menu}
            colorTextItem="#fff"
            />
            <main className="AppMain__layer__PageAndTopBar">
              <div className="HomePageContent">
                <div
                className="Scrollable--vertical
                HomePageContent__contentContainer"
                >
                  <Router/>
                </div>
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
      </div>
  )
}

export default App

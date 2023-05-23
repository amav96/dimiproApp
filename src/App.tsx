import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { NavBar } from "./components/NavBar/NavBar";
import { SideBar } from "./components/SideBar/SideBar";
import baseApiUrl from "./services/BaseApiUrl";

const menu = {
  top: [
      {
          title: 'Home',
          image: baseApiUrl + '/icons/Home.svg',
          visible : true,
          name: 'dashboard'
      },
      {
          title: 'Lista de siniestros',
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
          title: 'Agregar siniestro',
          image: baseApiUrl + '/icons/circulo_sumar.svg',
          visible : true
      },
      {
          title: 'Ajustes',
          image: baseApiUrl + '/icons/ajustes.svg',
          visible : true
      },
      {
          title: 'Insp. agendados',
          image: baseApiUrl + '/icons/calendar.svg',
          visible : true
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


function App() {

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

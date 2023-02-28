import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { AuthProvider } from './contexts/Auth'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { icons } from './assets/icons/fontAwesome';

library.add(fab, icons);


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

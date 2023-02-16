import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { AuthProvider } from './contexts/Auth';

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

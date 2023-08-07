import { BrowserRouter } from "react-router-dom";
import MainPage from "./views/Main";
import { MenuProvider } from "./context/MenuContext";


function App() {
  return (
    <div className="AppRoot-fullPage">
      <BrowserRouter>
        <MenuProvider>
          <MainPage />
        </MenuProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

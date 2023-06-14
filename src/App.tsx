import { BrowserRouter } from "react-router-dom";
import MainPage from "./views/Main";


function App() {
  return (
    <div className="AppRoot-fullPage">
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </div>
  );
}

export default App;

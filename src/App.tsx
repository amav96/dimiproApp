import { BrowserRouter } from "react-router-dom";
import MainPage from "./components/package/Main/Main";


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

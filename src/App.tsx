import { BrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
import { Web } from './views/Web/Web';
import {useAuth} from './hooks/useAuth'
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

function App() {

  const { isAuth, authLoader } = useAuth();

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
  return (
    <div className="AppRoot-fullPage">
      <BrowserRouter>
      {

        authLoader()
        ?
        <div className="h-screen flex items-center justify-center">
          <Spin indicator={antIcon} />
        </div>
        : isAuth()
        ? <Dashboard />
        : <Web/>
      }
      </BrowserRouter>
    </div>
  );
}

export default App;
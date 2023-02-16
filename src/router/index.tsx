
import { Routes, Route} from "react-router-dom";
import { Login } from '../views/auth/Login';
import { useAuth } from "../hooks"
import { useNavigate } from "react-router-dom";
import { Home } from "../views/Home";


export function Router() {

    const { user } = useAuth();
    const navigate = useNavigate();


    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        { !user ? (
            <>
            <Route path="/login" element={<Login/>} />
            </>
          ) : (
            <>
              
            </>
          )
        }
      </Routes>
    )
}
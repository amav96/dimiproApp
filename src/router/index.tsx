
import { Routes, Route} from "react-router-dom";
import { Login } from '../views/Auth/Login';
import { useAuth } from "../hooks"
import { useNavigate } from "react-router-dom";
import { Home } from "../views/Home";
import { Dashboard } from "../views/Dashboard";
import { Users } from "../views/Users/Users";



export function Router() {

    const { user } = useAuth();
    const navigate = useNavigate();

    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/users" element={<Users/>} />
        
      </Routes>
    )
}
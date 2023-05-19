
import { Routes, Route} from "react-router-dom";
import { Login } from '../views/Auth/Login';
import { Home } from "../views/Home";
import { Dashboard } from "../views/Dashboard";
import { Users } from "../views/Users/Users";

export function Router() {

    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/users" element={<Users/>} />
        
      </Routes>
    )
}

import { Routes, Route} from "react-router-dom";
import { Home } from "../views/Home";
import { Users } from "../views/Users/Users";
import  {Login}  from "../views/Auth/Login";

export function Router() {

    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<Login/>} />
      </Routes>
    )
}
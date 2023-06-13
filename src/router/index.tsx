
import { Routes, Route, Navigate} from "react-router-dom";
import { Home } from "@views/Home";
import { Users } from "@views/Settings/Users/Users";
import  {Login}  from "@views/Auth/Login";
import { AccesoDenegado } from "@views/Helpers/AccesoDenegado";
import ProtectRoute from "./ProtectRoute";

export function Router() {

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route element={<ProtectRoute gate={'users_index'} />}>
          <Route path="/users" element={<Users/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/acceso-denegado" element={<AccesoDenegado/>} />
        <Route path="/forgot-password" element={<Login/>} />
      </Routes>
    )
}
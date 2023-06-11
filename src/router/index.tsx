
import { Routes, Route, Navigate} from "react-router-dom";
import { Home } from "../views/Home";
import { Users } from "../views/Users/Users";
import  {Login}  from "../views/Auth/Login";
import ProtectRoute from "./ProtectRoute";

export function Router() {

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route element={<ProtectRoute gate={'index_users'} />}>
          <Route path="/users" element={<Users/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<Login/>} />
      </Routes>
    )
}
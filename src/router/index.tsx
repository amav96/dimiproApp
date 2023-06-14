
import { Routes, Route, Navigate} from "react-router-dom";
import { Users } from "@views/Settings/Users/Users";
import  {Login}  from "@views/Auth/Login";
import  {Logout}  from "@views/Auth/Logout";
import { AccesoDenegado } from "@views/Helpers/AccesoDenegado";
import ProtectRoute from "./ProtectRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route element={<ProtectRoute gate={"users_index"} />}>
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<Login />} />
      {/* <Route path="/add-contract" element={<AddContract />} /> */}
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />
    </Routes>
  );
}

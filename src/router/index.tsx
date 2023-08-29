import { Routes, Route, Navigate } from "react-router-dom";
import { Users } from "@views/Settings/Users";
import { Login } from "@views/Auth/Login";
import { Logout } from "@views/Auth/Logout";
import { AccesoDenegado } from "@views/Helpers/AccesoDenegado";
import ProtectRoute from "./ProtectRoute";
import AddContract from "@views/Contracts/AddContract/AddContract";
import ListContracts from "@views/Contracts/ListContracts/ListContracts";
import { NotFound } from "@views/Helpers/NotFound";
import { Companies } from "@views/Settings/Companies/Companies";
import { Packagings } from "@views/Settings/Packagings";
import { Calibers } from "@views/Settings/Calibers";
import { Currencies } from "@views/Settings/Currencies";
import { PaymentMethods } from "@views/Settings/PaymentMethods";
import { Products } from "@views/Settings/Products";
import { Surveyors } from "@views/Settings/Surveyors";
import { Categories } from "@views/Settings/Categories";
import PDFcontract from "@views/Contracts/PDFcontract";
import Profile from "@views/Profile/Profile";
import RestorePassword from "../components/Auth/RestorePassword";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list-contracts" replace />} />
      <Route element={<ProtectRoute gate={"contracts_index"} />}>
        <Route path="/list-contracts" element={<ListContracts />} />
      </Route>
      <Route element={<ProtectRoute gate={"companies_index"} />}>
        <Route path="/settings/companies" element={<Companies />} />
      </Route>
      <Route element={<ProtectRoute gate={"categories_index"} />}>
        <Route path="/settings/categories" element={<Categories />} />
      </Route>
      <Route element={<ProtectRoute gate={"packagings_index"} />}>
        <Route path="/settings/packagings" element={<Packagings />} />
      </Route>
      <Route element={<ProtectRoute gate={"calibers_index"} />}>
        <Route path="/settings/calibers" element={<Calibers />} />
      </Route>
      <Route element={<ProtectRoute gate={"currencies_index"} />}>
        <Route path="/settings/currencies" element={<Currencies />} />
      </Route>
      <Route element={<ProtectRoute gate={"payment_methods_index"} />}>
        <Route path="/settings/paymentMethods" element={<PaymentMethods />} />
      </Route>
      <Route element={<ProtectRoute gate={"products_index"} />}>
        <Route path="/settings/products" element={<Products />} />
      </Route>
      <Route element={<ProtectRoute gate={"surveyors_index"} />}>
        <Route path="/settings/surveyors" element={<Surveyors />} />
      </Route>
      <Route element={<ProtectRoute gate={"contracts_store"} />}>
        <Route path="/add-contract" element={<AddContract />} />
      </Route>
      <Route element={<ProtectRoute gate={"users_index"} />}>
        <Route path="/settings/users" element={<Users />} />
      </Route>
      <Route element={<ProtectRoute gate={"contracts_index"} />}>
        <Route path="/pdf/:id" element={<PDFcontract />} />
      </Route>
      <Route element={<ProtectRoute gate={"profile_index"} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/restore-password" element={<RestorePassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<Login />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

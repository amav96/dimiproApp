import { Routes, Route, Navigate } from "react-router-dom";
import { Users } from "../modules/Settings/pages/Users";
import { AccesoDenegado } from "@views/Helpers/AccesoDenegado";
import ProtectRoute from "./ProtectRoute";
import { AddContract } from "../modules/Contracts/pages/AddContract";
import { Contracts } from "../modules/Contracts/pages/Contracts";
import { PDFContract } from "../modules/Contracts/pages/PDFContract";
import { NotFound } from "@views/Helpers/NotFound";
import { Companies } from "../modules/Settings/pages/Companies";
import { Packagings } from "../modules/Settings/pages/Packagings";
import { Calibers } from "../modules/Settings/pages/Calibers";
import { Currencies } from "../modules/Settings/pages/Currencies";
import { PaymentMethods } from "../modules/Settings/pages/PaymentMethods";
import { Products } from "../modules/Settings/pages/Products";
import { Surveyors } from "../modules/Settings/pages/Surveyors";
import { Categories } from "../modules/Settings/pages/Categories";
import { Profile } from "../modules/Profile/pages/Profile";
import RestorePassword from "../modules/Auth/components/RestorePassword";

import { Login } from "../modules/Auth/Login";
import { Logout } from "../modules/Auth/Logout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list-contracts" replace />} />

      {/* CONTRACTS */}
      <Route element={<ProtectRoute gate={"contracts_index"} />}>
        <Route path="/list-contracts" element={<Contracts />} />
      </Route>
      <Route element={<ProtectRoute gate={"contracts_store"} />}>
        <Route path="/add-contract" element={<AddContract />} />
      </Route>
      <Route element={<ProtectRoute gate={"contracts_index"} />}>
        <Route path="/pdf/:id" element={<PDFContract />} />
      </Route>

      {/* SETTINGS */}
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
      <Route element={<ProtectRoute gate={"users_index"} />}>
        <Route path="/settings/users" element={<Users />} />
      </Route>

      {/* PROFILE */}
      <Route element={<ProtectRoute gate={"profile_index"} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* AUTHENTICATION */}
      <Route path="/restore-password" element={<RestorePassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<Login />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


import { Routes, Route, Navigate} from "react-router-dom";
import { Users } from "@views/Settings/Users";
import  {Login}  from "@views/Auth/Login";
import  {Logout}  from "@views/Auth/Logout";
import { AccesoDenegado } from "@views/Helpers/AccesoDenegado";
import ProtectRoute from "./ProtectRoute";
import AddContract from "@views/Add-Contract/AddContract";
import ListContacts from "@views/List-Contracts/ListContacts";
import { NotFound } from "@views/Helpers/NotFound";
import { Companies } from "@views/Settings/Companies";
import { Packagings } from "@views/Settings/Packagings";
import { Calibers } from "@views/Settings/Calibers";
import { Currencies } from "@views/Settings/Currencies";
import { PaymentMethods } from "@views/Settings/PaymentMethods";
import { Products } from "@views/Settings/Products";
import { Surveyors } from "@views/Settings/Surveyors";
import { Categories } from "@views/Settings/Categories";
import PDFcontract from "@views/List-Contracts/PDFcontract";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ajustes/users" replace />} />
      <Route element={<ProtectRoute gate={"users_index"} />}>
        <Route path="/ajustes/users" element={<Users />} />
      </Route>
      <Route element={<ProtectRoute gate={"companies_index"} />}>
        <Route path="/ajustes/companies" element={<Companies />} />
      </Route>
      <Route element={<ProtectRoute gate={"categories_index"} />}>
        <Route path="/ajustes/categories" element={<Categories />} />
      </Route>
      <Route element={<ProtectRoute gate={"packagings_index"} />}>
        <Route path="/ajustes/packagings" element={<Packagings />} />
      </Route>
      <Route element={<ProtectRoute gate={"calibers_index"} />}>
        <Route path="/ajustes/calibers" element={<Calibers />} />
      </Route>
      <Route element={<ProtectRoute gate={"currencies_index"} />}>
        <Route path="/ajustes/currencies" element={<Currencies />} />
      </Route>
      <Route element={<ProtectRoute gate={"payment_methods_index"} />}>
        <Route path="/ajustes/paymentMethods" element={<PaymentMethods />} />
      </Route>
      <Route element={<ProtectRoute gate={"products_index"} />}>
        <Route path="/ajustes/products" element={<Products />} />
      </Route>
      <Route element={<ProtectRoute gate={"surveyors_index"} />}>
        <Route path="/ajustes/surveyors" element={<Surveyors />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<Login />} />
      <Route path="/add-contract" element={<AddContract />} />
      <Route path="/list-contracts" element={<ListContacts />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/pdf/:id" element={<PDFcontract />} />
      
    </Routes>
  );
}


import { Routes, Route} from "react-router-dom";
import { Home } from "../views/Home";
import { Users } from "../views/Users/Users";

export function Router() {

    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    )
}
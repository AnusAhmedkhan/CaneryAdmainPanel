import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Dashboard from "../src/Pages/Dashboard";
import Users from "../src/Pages/Users";
import ResponsiveDrawer from "./Layout/ResponsiveDrawer";

import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Login from "./Pages/Login/Login";
import Services from "./Pages/Services";
import Remainder from "./Pages/Remainders";
import Client from "./Pages/Clients/Client";

function App() {
  const { user } = useContext(AuthContext);
  const mainRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<ResponsiveDrawer />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Clients" element={<Client />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Remainders" element={<Remainder />} />
      </Route>
    )
  );
  const authRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
      </>
    )
  );
  const routes = user ? mainRoutes : authRoutes;
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

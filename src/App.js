import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
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
import Invoices from "./Pages/Invoices";
import Withdrawal from "./Pages/WithDrawal";

function App() {
  const { user } = useContext(AuthContext);

  const mainRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/admin" replace />} />,
        <Route path="/admin" element={<ResponsiveDrawer />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/Users" element={<Users />} />
          <Route path="/admin/Clients" element={<Client />} />
          <Route path="/admin/Services" element={<Services />} />
          <Route path="/admin/Remainders" element={<Remainder />} />
          <Route path="/admin/Invoices" element={<Invoices />} />
          <Route path="/admin/Withdrawal" element={<Withdrawal />} />
        </Route>
      </>
    )
  );
  const authRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/Login" replace />} />,
        <Route path="/Login" element={<Login />} />
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

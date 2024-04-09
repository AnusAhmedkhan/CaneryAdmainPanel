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
import Login from "./Pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const mainRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<ResponsiveDrawer />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
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

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
import { Toaster } from "react-hot-toast";

function App() {
  const mainRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<ResponsiveDrawer />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={mainRoutes} />
      <Toaster />
    </div>
  );
}

export default App;

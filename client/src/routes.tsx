import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Home from "./pages/home";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default routes;

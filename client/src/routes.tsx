import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Home from "./pages/home";
import New from "./pages/new";
import Profile from "./pages/profile";
import UpdatePost from "./pages/update";

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
    path: "/new",
    element: <New />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/update/:id",
    element: <UpdatePost />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default routes;

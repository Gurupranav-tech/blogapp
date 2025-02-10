import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/Auth";
import "./index.css";
import routes from "./routes";
import PostsProvider from "./contexts/PostsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <RouterProvider router={routes} />
      </PostsProvider>
    </AuthProvider>
    <ToastContainer draggable position="bottom-right" />
  </StrictMode>
);

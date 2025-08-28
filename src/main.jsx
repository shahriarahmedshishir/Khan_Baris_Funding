import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import User from "./Components/User.jsx";
import About from "./Components/About.jsx";
import Salat from "./Components/Salat.jsx";
import Profile from "./Components/Profile.jsx";
import Dashboard from "./Components/Dashboard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRouter from "./Components/PrivateRouter/PrivateRouter.jsx";
import SignIn from "./SignIn.jsx";
import AuthProvider from "./Components/context/AuthProvider.jsx";
import AddFund from "./Components/AddFund.jsx";
import EditProfile from "./Components/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn></SignIn>,
  },
  {
    path: "/home",
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
    errorElement: <h2>Page not found</h2>,
    children: [
      {
        path: "about",
        element: (
          <PrivateRouter>
            <About />
          </PrivateRouter>
        ),
      },
      {
        path: "salat",
        element: (
          <PrivateRouter>
            <Salat />
          </PrivateRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRouter>
            <User />
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        ),
        loader: () => fetch("http://localhost:3000/fund"),
      },
      {
        path: "addfund",
        element: (
          <PrivateRouter>
            <AddFund />
          </PrivateRouter>
        ),
      },
      {
        path: "editprofile",
        element: (
          <PrivateRouter>
            <EditProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

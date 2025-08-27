import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import User from "./Components/User.jsx";
import About from "./Components/About.jsx";
import Salat from "./Components/Salat.jsx";
import Profile from "./Components/Profile.jsx";
import ChatGroup from "./Components/ChatGroup.jsx";
import Dashboard from "./Components/Dashboard.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRouter from "./Components/PrivateRoter/PrivateRouter.jsx";
import SignIn from "./SignIn.jsx";
import AuthProvider from "./Components/context/AuthProvider.jsx";
import AddFund from "./Components/AddFund.jsx";
import EditProfile from "./Components/EditProfile.jsx";
import Register from "./Components/Sign Up/Register.jsx";

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
          <PrivateRoter>
            <About />
          </PrivateRoter>
        ),
      },
      {
        path: "salat",
        element: (
          <PrivateRoter>
            <Salat />
          </PrivateRoter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoter>
            <Profile />
          </PrivateRoter>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoter>
            <User />
          </PrivateRoter>
        ),
        loader: () => fetch("http://localhost:3000/profile"),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoter>
            <Dashboard />
          </PrivateRoter>
        ),
        loader: () => fetch("http://localhost:3000/fund"),
      },
      {
        path: "addfund",
        element: (
          <PrivateRoter>
            <AddFund />
          </PrivateRoter>
        ),
      },
      {
        path: "editprofile",
        element: (
          <PrivateRoter>
            <EditProfile />
          </PrivateRoter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoter>
            <Profile />
          </PrivateRoter>
        ),
      },
      {
        path: "register",
        element: (
          <PrivateRoter>
            <Register />
          </PrivateRoter>
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

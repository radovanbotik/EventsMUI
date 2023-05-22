import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../features/landing/Landing";
import Layout from "./layout/Layout";
import Error from "../common/errors/Error";
import React from "react";
import Account from "../features/auth/account/Account";
import Profile from "../features/profiles/profilePage/Profile";
import Users from "../features/profiles/usersPage/Users";
import Persistent from "./layout/Persistent";

const EventDashboard = React.lazy(() => import("../features/events/dashboard/EventDashboard"));
const Event = React.lazy(() => import("../features/events/event/Event"));

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "events",
    // element: <Layout />,
    element: <Persistent />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<div>loading....</div>}>
                <EventDashboard />
              </React.Suspense>
            ),
          },
          {
            path: "event/:id",
            element: (
              <React.Suspense fallback={<div>loading....</div>}>
                <Event />
              </React.Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "users",
    element: <Persistent />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: "profile/:id",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "account",
    element: <Persistent />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Account />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

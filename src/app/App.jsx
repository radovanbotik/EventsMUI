import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../features/landing/Landing";
import Error from "../common/errors/Error";
import React from "react";
import Persistent from "./layout/Persistent";
import PageLoader from "../common/loaders/PageLoader";

const EventDashboard = React.lazy(() =>
  import("../features/events/dashboard/EventDashboard")
);
const Event = React.lazy(() => import("../features/events/event/Event"));
const Users = React.lazy(() => import("../features/profiles/usersPage/Users"));
const Profile = React.lazy(() =>
  import("../features/profiles/profilePage/Profile")
);
const Account = React.lazy(() => import("../features/auth/account/Account"));

export const router = createBrowserRouter([
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
              <React.Suspense fallback={<PageLoader />}>
                <EventDashboard />
              </React.Suspense>
            ),
          },
          {
            path: "event/:id",
            element: (
              <React.Suspense fallback={<PageLoader />}>
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
            element: (
              <React.Suspense fallback={<PageLoader />}>
                <Users />
              </React.Suspense>
            ),
          },
          {
            path: "profile/:id",
            element: (
              <React.Suspense fallback={<PageLoader />}>
                <Profile />
              </React.Suspense>
            ),
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
            element: (
              <React.Suspense fallback={<PageLoader />}>
                <Account />
              </React.Suspense>
            ),
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

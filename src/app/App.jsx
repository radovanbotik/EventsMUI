import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../features/landing/Landing";
import Error from "../common/errors/Error";
import React from "react";
import Shared from "./layout/Shared";
import PageLoader from "../common/loaders/PageLoader";

const EventDashboard = React.lazy(() => import("../features/events/dashboard/EventDashboard"));
const Event = React.lazy(() => import("../features/events/event/Event"));
const Users = React.lazy(() => import("../features/users/users/Users"));
const Profile = React.lazy(() => import("../features/users/profile/Profile"));
const Account = React.lazy(() => import("../features/account/Account"));

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "events",
    // element: <Layout />,
    element: <Shared />,
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
    element: <Shared />,
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
    element: <Shared />,
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

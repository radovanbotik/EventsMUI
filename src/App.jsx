import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import React from "react";
import Account from "./pages/Account";
import Profile from "./features/profiles/profilePage/Profile";
import Users from "./features/profiles/usersPage/Users";

const Index = React.lazy(() => import("./pages/Index"));
const Event = React.lazy(() => import("./pages/Event"));

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "/events",
    element: <Layout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: (
              <React.Suspense fallback={<div>loading....</div>}>
                <Index />
              </React.Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <React.Suspense fallback={<div>loading....</div>}>
                <Event />
              </React.Suspense>
            ),
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "users",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

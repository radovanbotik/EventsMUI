import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as loadEvents } from "./pages/Index";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import Event, { loader as loadEvent } from "./pages/Event";
import { action as createEvent } from "./routes/createEvent";
import React from "react";

const Index = React.lazy(() => import("./pages/Index"));

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
            action: createEvent,
            loader: loadEvents,
          },
          {
            path: ":id",
            element: <Event />,
            loader: loadEvent,
          },
          {
            path: "new-event",
            action: createEvent,
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

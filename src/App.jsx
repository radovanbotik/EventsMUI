import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index, { loader as loadEvents } from "./pages/Index";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import Event from "./pages/Event";
import { action as createEvent } from "./routes/createEvent";

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
            element: <Index />,
            action: createEvent,
            loader: loadEvents,
          },
          {
            path: ":id",
            element: <Event />,
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

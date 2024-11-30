import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./App.css";

import Home from "./pages/home/Home";
import Manage from "./pages/manage/Manage";
import Layout from "./pages/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "manage",
        element: <Manage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

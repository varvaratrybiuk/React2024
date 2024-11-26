import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import { dataLoader } from "./helpers/dataloader";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Error = lazy(() => import("./components/error/Error"));

function HydrateFallback() {
  return <p>Loading Page...</p>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    HydrateFallback: HydrateFallback,
    errorElement: <Error />,
    children: [
      {
        path: "catalog",
        element: <Catalog />,
        loader: dataLoader,
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

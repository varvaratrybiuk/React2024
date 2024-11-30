import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import { dataLoader } from "./helpers/dataloader";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Error = lazy(() => import("./pages/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading Page...</p>}>
        <Layout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading Page...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "catalog",
        element: (
          <Suspense fallback={<p>Loading Page...</p>}>
            <Catalog />
          </Suspense>
        ),
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

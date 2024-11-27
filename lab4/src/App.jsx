import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import { dataLoader } from "./helpers/dataloader";

const HomePage = lazy(() => import("./pages/Home"));
const CatalogPage = lazy(() => import("./pages/Catalog"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Loading Page...</p>}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "catalog",
        element: (
          <Suspense fallback={<p>Loading Page...</p>}>
            <CatalogPage />
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

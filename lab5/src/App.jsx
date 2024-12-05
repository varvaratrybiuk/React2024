import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/home/Home"));
const Manage = lazy(() => import("./pages/manage/Manage"));
const Layout = lazy(() => import("./pages/Layout"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage.jsx"));
import LoadingPage from "./pages/loadingPage/LoadingPage.jsx";

import { FinanceTrackerProvider } from "./context/financeTrackerContext.jsx";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
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

  return (
    <Suspense fallback={<LoadingPage />}>
      <FinanceTrackerProvider>
        <RouterProvider router={router} />
      </FinanceTrackerProvider>
    </Suspense>
  );
}

export default App;

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Manage from "./pages/manage/Manage";
import Layout from "./pages/Layout";

import { FinanceTrackerProvider } from "./context/financeTrackerContext.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";

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
    <FinanceTrackerProvider>
      <RouterProvider router={router} />
    </FinanceTrackerProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./App.css";
import { createContext } from "react";

import Home from "./pages/home/Home";
import Manage from "./pages/manage/Manage";
import Layout from "./pages/Layout";
import LoadingPage from "./pages/loading/LoadingPage";
import { financeTrackerMachine } from "./machines/financeTracker";
import { useMachine } from "@xstate/react";

export const FinanceTrackerContext = createContext([null, null]);

function App() {
  const [state, send] = useMachine(financeTrackerMachine);

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
  return (
    <>
      <FinanceTrackerContext.Provider value={[state, send]}>
        <RouterProvider router={router} />
      </FinanceTrackerContext.Provider>
    </>
  );
}

export default App;

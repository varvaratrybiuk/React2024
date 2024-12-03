import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import "./App.css";
import { createContext } from "react";

import Home from "./pages/home/Home";
import Manage from "./pages/manage/Manage";
import Layout from "./pages/Layout";
import LoadingPage from "./pages/loading/LoadingPage";
import { cardsLoader } from "./helpers/cardsLoader";
import { financeTrackerMachine } from "./machines/financeTracker";
import { createActor } from "xstate";

const financeTrackerActor = createActor(financeTrackerMachine);
export const FinanceTrackerContext = createContext(financeTrackerActor);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <LoadingPage />,

    children: [
      {
        index: true,
        loader: async () => {
          return await cardsLoader(financeTrackerActor);
        },
        element: <Home />,
      },
      {
        path: "manage",
        loader: async () => {
          return await cardsLoader(financeTrackerActor);
        },
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
      <FinanceTrackerContext.Provider value={financeTrackerActor}>
        <RouterProvider router={router} />
      </FinanceTrackerContext.Provider>
    </>
  );
}

export default App;

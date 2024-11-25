import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import { dataLoader } from "./helpers/dataloader";
import Error from "./components/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/catalog",
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
      <RouterProvider router={router} />;
    </>
  );
}

export default App;

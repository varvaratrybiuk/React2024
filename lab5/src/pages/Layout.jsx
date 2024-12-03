import NavBar from "../components/navBar/NavBar";
import { Outlet } from "react-router-dom";
import { pathOptions } from "../data/constants";

export default function Layout() {
  return (
    <>
      <NavBar options={pathOptions} />
      <Outlet />
    </>
  );
}

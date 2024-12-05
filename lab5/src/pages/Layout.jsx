import { Outlet } from "react-router-dom";

import NavBar from "../components/navBar/NavBar";

import { PATH_OPTIONS } from "../constants/constants";

export default function Layout() {
  return (
    <>
      <NavBar options={PATH_OPTIONS} />
      <Outlet />
    </>
  );
}

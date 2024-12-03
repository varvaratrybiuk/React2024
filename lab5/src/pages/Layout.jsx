import NavBar from "../components/navBar/NavBar";
import { Outlet } from "react-router-dom";


const options = [{ "/": "Головна" }, { "/manage": "Мої карти" }];

export default function Layout() {
  return (
    <>
      <NavBar options={options} />
      <Outlet />
    </>
  );
}

import NavigationBar from "../components/navigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
}

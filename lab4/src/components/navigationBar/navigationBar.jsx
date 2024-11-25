import { NavLink } from "react-router-dom";

import style from "./navigationBarStyle.module.css";

export default function NavigationBar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${style["nav-link"]} ${isActive ? style["active"] : ""}`
        }
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          `${style["nav-link"]} ${isActive ? style["active"] : ""}`
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
}

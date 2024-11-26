import { NavLink } from "react-router-dom";

import style from "./NavigationBarStyle.module.css";

export default function NavigationBar() {
  return (
    <nav className={style["nav-bar"]}>
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

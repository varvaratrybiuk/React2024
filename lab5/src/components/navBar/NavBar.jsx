import { NavLink } from "react-router-dom";
import style from "./NavBarStyle.module.css";

export default function NavBar(props) {
  const { options } = props;
  //console.log(options);
  return (
    <nav className={style["navbar"]}>
      {options.map((value, index) => {
        const path = Object.keys(value)[0];
        const label = value[path];
        return (
          <NavLink
            key={`link-${index}`}
            to={path}
            className={({ isActive }) =>
              `${style["nav-link"]} ${isActive ? style["active-link"] : ""}`
            }
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}

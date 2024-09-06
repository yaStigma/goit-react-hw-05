import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <div className={css.header}>
      <NavLink className={pathname == "/" ? css.btn_active : css.btn} to="/">Home</NavLink>
      <NavLink className={pathname == "/movies" ? css.btn_active : css.btn} to="/movies">Movies</NavLink>
    </div>
  )
}


import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const activeClass = ({ isActive }) => {
    return (css.home, isActive && css.active);
  };
  return (
    <div className={css.container}>
      <nav className={css.navigation}>
        <NavLink className={activeClass} to="/">
          Home
        </NavLink>
        <NavLink className={activeClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </div>
  );
};
export default Navigation;
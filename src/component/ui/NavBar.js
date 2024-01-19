

import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";

const NavBar = (p) => {
  return (
    <header className={c.navBar}>
      <div className={c.logo}>
        <NavLink to="/home">
          <img src={imglogo} alt="logo for aptiv" />
        </NavLink>
      </div>
      <div className={c.links}>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? c.activeLink : c.link)}
            >
              home
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default NavBar;

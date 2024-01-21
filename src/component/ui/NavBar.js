import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";

const NavBar = (p) => {
  const { isLoged } = useSelector((s) => s.datas);

  return (
    <header className={c.navBar}>
      <div className={c.logo}>
        <NavLink to="/home">
          <img src={imglogo} alt="logo for aptiv" />
        </NavLink>
      </div>
      <div className={c.links}>
        {isLoged && (
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? c.activeLink : c.link)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/planning"
                className={({ isActive }) => (isActive ? c.activeLink : c.link)}
              >
                Planning
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/assignTeamLeader"
                className={({ isActive }) => (isActive ? c.activeLink : c.link)}
              >
                Assign team leader
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};
export default NavBar;

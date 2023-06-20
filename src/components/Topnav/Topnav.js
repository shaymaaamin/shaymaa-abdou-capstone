import "./Topnav.scss";

import { Link, NavLink } from "react-router-dom";

export default function Topnav() {

  const linkClassName = ({ isActive }) => {
    const className = "topnav__link";
    return isActive ? `${className} ${className}--active` : `${className}`;
  };

  return (
    <>
      <section className="topnav">
        <div className="topnav__wrapper">
          <Link to="/" className="topnav__link">
            ⏱️JAS
          </Link>
          <div className="spacer"></div>
          <NavLink to="/employees" className={linkClassName}>
            Employees
          </NavLink>
          <NavLink to="/assets" className={linkClassName}>
            Assets
          </NavLink>
          <NavLink to="/jobs" className={linkClassName}>
            Jobs
          </NavLink>
          <NavLink to="/lookups" className={linkClassName}>
            Lookups
          </NavLink>
        </div>
        <div className="divider divider--no-margin"></div>
      </section>
    </>
  );
}
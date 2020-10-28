import React from "react";
import logo from "../logo.svg";
import { NavLink } from "react-router-dom";
import axios from "axios";

const NavBar = ({ user, setUser }) => {
  const logout = async () => {
    try {
      const config = {
        headers: {
          Authorization: user.token,
        },
      };
      const res = await axios.get("/auth/logout", config);
      if (!res.data.success) {
        return;
      }
      setUser({});
      localStorage.removeItem("servicesAppointmentUser");
    } catch (error) {}
  };
  const guestLinks = (
    <React.Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            SignUp
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/services">
          Services Stations
          </NavLink>
        </li>
        {user ? (
          <li className="nav-item">
          <NavLink className="nav-link" to="/appointments">
            Appointments
          </NavLink>
        </li>
        ):(
          ""
        )}
        {user.isAdmin ? (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {/* <NavLink className="dropdown-item" exact to="/admin">
                List Admins
              </NavLink> */}
              {/* <NavLink className="dropdown-item" to="/admin/add">
                Add Admins
              </NavLink> */}
              <NavLink className="dropdown-item" to="/admin/addservice">
                Add Service Station
              </NavLink>
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
      <ul className="ml-auto navbar-nav">
        <li className="nav-item mr-2">
          <NavLink className="nav-link" style={{ color: "#FFF" }} to="/profile">
            Welcome {user.name}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="btn btn-danger ml-auto mr-4"
            type="button"
            onClick={logout}
            to="/"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg nav-cont">
      <NavLink className="navbar-brand" to="/">
        <img
          src="https://gist.githubusercontent.com/prashankhan/5fed43125e54483377b5ee62fce5080e/raw/209c1e2d629196d5bb934be0ed4267bbdae1b24c/kishobigan.svg"
          style={{width: "200px"}}
          className="d-inline-block mr-2"
          alt=""
        />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {user.email ? userLinks : guestLinks}
      </div>
    </nav>
  );
};

export default NavBar;

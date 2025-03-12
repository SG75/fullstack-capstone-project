import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";

export default function Navbar() {
  // const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
  const { isLoggedIn, setIsLoggedIn, setUserName } = useAppContext();
  // const navigate = useNavigate();
  useEffect(() => {
    const authTokenFromSession = sessionStorage.getItem("auth-token");
    const nameFromSession = sessionStorage.getItem("name");
    if (authTokenFromSession) {
      if (isLoggedIn && nameFromSession) {
        setUserName(nameFromSession);
      } else {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn, setIsLoggedIn, setUserName]);
  // const handleLogout = () => {
  //   sessionStorage.removeItem("auth-token");
  //   sessionStorage.removeItem("name");
  //   sessionStorage.removeItem("email");
  //   setIsLoggedIn(false);
  //   navigate(`/app`);
  // };
  // const profileSecton = () => {
  //   navigate(`/app/profile`);
  // };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        GiftLink
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/home.html">
              Home
            </a>{" "}
            {/* Link to home.html */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/app">
              Gifts
            </a>{" "}
            {/* Updated Link */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

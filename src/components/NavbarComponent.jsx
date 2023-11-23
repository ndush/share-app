import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = ({
  isAuthenticated,
  isPremium,
  onLogout,
  onPremiumUpgrade,
}) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/"></Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
            <li>
              <Link to="/my-posts">My Posts</Link>
            </li>
            <li>
              <Link to="/following">Following</Link>
            </li>
            <li>
              <Link to="/all-users">All Users</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="nav-auth">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            {isPremium ? (
              <li>
                <span>Premium User</span>
                <span style={{ marginLeft: "5px" }}>100 More</span>
              </li>
            ) : (
              <li>
                <button onClick={onPremiumUpgrade}>Upgrade to Premium</button>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavbarComponent;

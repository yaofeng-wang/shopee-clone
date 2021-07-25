import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

const NavigationBar = () => {
  const { user, signout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="title" to="/">
        Shopee Clone Project
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={signout}>
              Log out
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

NavigationBar.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
};

export default NavigationBar;

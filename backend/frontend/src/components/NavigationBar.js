import { Link } from "react-router-dom";
import firebase from "firebase";
import PropTypes from "prop-types";

const NavigationBar = ({ loginStatus }) => {
  return (
    <nav className="navbar">
      <Link className="title" to="/">
        Shopee Clone Project
      </Link>
      <div>
        {loginStatus ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={() => firebase.auth().signOut()}>
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

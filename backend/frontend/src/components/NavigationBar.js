import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchBar from "./SearchBar";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

const NavigationBar = ({ cart }) => {
  const { user, signout } = useAuth();

  return (
    <div className="sc-navbar">
      <Link className="title" to="/">
        Shopee Clone
      </Link>
      <SearchBar />
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">My Cart</Link>
            <Badge pill bg="light" text="dark">
              {cart.size}
            </Badge>
            <Link to="/store">My Store</Link>
            <Link to="/" onClick={signout}>
              Sign out
            </Link>
          </>
        ) : (
          <Link to="/sign-in">Sign in</Link>
        )}
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  cart: PropTypes.object,
};

export default NavigationBar;

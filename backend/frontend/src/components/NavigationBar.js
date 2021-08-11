import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchBar from "./SearchBar";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./CartContext";

const NavigationBar = () => {
  const { user, signout } = useAuth();
  const { cart } = useCart();

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

export default NavigationBar;

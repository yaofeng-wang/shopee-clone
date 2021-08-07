import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchBar from "./SearchBar";

const NavigationBar = () => {
  const { user, signout } = useAuth();

  return (
    <nav
      className="navbar"
      style={{ flexFlow: "row nowrap", whiteSpace: "nowrap" }}
    >
      <Link className="title" to="/">
        Shopee Clone
      </Link>
      <SearchBar />
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={signout}>
              Sign out
            </Link>
          </>
        ) : (
          <Link to="/sign-in">Sign in</Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;

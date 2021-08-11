import { useAuth } from "./AuthContext";
import { Redirect } from "react-router-dom";

export default function SignIn() {
  const { user, signInButton } = useAuth();

  return (
    <>
      {user ? (
        <Redirect to="/sign-in" />
      ) : (
        <div className="sc-sign-in-box">{signInButton}</div>
      )}
    </>
  );
}

SignIn.propTypes = {};

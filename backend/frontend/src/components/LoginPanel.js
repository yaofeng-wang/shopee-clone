import { useAuth } from "./AuthContext";
import { Redirect } from "react-router-dom";

export default function LoginPanel() {
  const { user, signInButton } = useAuth();

  return (
    <>
      {user ? (
        <Redirect to="/login" />
      ) : (
        <div className="login-box">{signInButton}</div>
      )}
    </>
  );
}

LoginPanel.propTypes = {};

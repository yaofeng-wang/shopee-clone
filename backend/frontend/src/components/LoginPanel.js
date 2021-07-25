import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "./AuthContext";

export default function LoginPanel() {
  const { uiConfig } = useAuth();

  return (
    <div className="login-box">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

LoginPanel.propTypes = {};

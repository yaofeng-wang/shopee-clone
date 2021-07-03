import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { initFirebase, uiConfig } from "./FirebaseAuth";

export default function LoginPanel() {
  initFirebase();

  return (
    <div className="login-box">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

LoginPanel.propTypes = {};

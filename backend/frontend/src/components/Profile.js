import React from "react";
import { useAuth } from "./AuthContext";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);

  return <div>Hi</div>;
}

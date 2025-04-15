import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./context/AuthContext";

const GoogleAuth = () => {
  const { setUser } = useAuth();

  const handleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    // Replace this with decoded JWT or real API call
    const dummyUsername = "GoogleUser";
    setUser({ username: dummyUsername });
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="google-auth">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleAuth;

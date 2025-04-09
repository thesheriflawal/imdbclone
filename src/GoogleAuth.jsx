import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const handleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
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

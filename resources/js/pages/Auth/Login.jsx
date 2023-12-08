import GuestLayout from "@/layouts/GuestLayout";
import React from "react";
import { useSelector } from "react-redux";

const Login = () => {
  const appearance = useSelector((state) => state.appearance);

  console.log(appearance.mode);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

/**
 * Layout
 */
Login.layout = (page) => <GuestLayout title="Login" children={page} />;

export default Login;

import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import React from "react";

const User = () => {
  return (
    <div>
      <h1>User</h1>
    </div>
  );
};

User.layout = (page) => (
  <AuthLayout title="User">
    <Header title="User">{page}</Header>
  </AuthLayout>
);

export default User;

import AuthLayout from "@/layouts/AuthLayout";
import React from "react";
import SbpTemplate from "./Template";

const Sbp = (props) => {
  return (
    <div>
      <h1>Master SBP</h1>
    </div>
  );
};

/**
 * Layout
 */
Sbp.layout = (page) => (
  <AuthLayout title="Master SBP">
    <SbpTemplate>{page}</SbpTemplate>
  </AuthLayout>
);

export default Sbp;

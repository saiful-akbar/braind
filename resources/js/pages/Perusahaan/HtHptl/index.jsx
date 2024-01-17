import React from "react";
import PerusahaanHtHptlTemplate from "./Template";
import AuthLayout from "@/layouts/AuthLayout";

/**
 * Halaman perusahaan cukai HT + HTPL
 *
 * @returns {React.ReactElement}
 */
const PerusahaanHtHptl = () => {
  return <div></div>;
};

PerusahaanHtHptl.layout = (page) => (
  <AuthLayout title="Perusahaan Cukan HT + HPTL">
    <PerusahaanHtHptlTemplate children={page} />
  </AuthLayout>
);

export default PerusahaanHtHptl;

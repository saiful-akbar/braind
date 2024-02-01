import React from "react";
import PerusahaanMmeaTemplate from "./Template";

/**
 * Halaman perusahaan cukai MMEA.
 *
 * @returns {React.ReactElement}
 */
const PerusahaanMmea = (props) => {
  console.log(props);
  return <div></div>;
};

/**
 * Layout
 */
PerusahaanMmea.layout = (page) => (
  <PerusahaanMmeaTemplate>{page}</PerusahaanMmeaTemplate>
);

export default PerusahaanMmea;

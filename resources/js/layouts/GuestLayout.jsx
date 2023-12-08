import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";

/**
 * Guest layout
 *
 * @param {children} props
 * @returns {React.ReactElement}
 */
const GuestLayout = (props) => {
  const { children, title } = props;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </div>
  );
};

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default GuestLayout;

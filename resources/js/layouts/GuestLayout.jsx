import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import BaseLayout from "./BaseLayout";
import { Box } from "@mui/material";

/**
 * Guest layout
 *
 * @param {children} props
 * @returns {React.ReactElement}
 */
const GuestLayout = (props) => {
  const { children, title } = props;

  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </BaseLayout>
  );
};

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default GuestLayout;

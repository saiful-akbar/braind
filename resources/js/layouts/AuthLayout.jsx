import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "./BaseLayout";
import { Head } from "@inertiajs/react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import SettingsModal from "@/components/Modals/SettingsModal";

/**
 * Auth layout
 *
 * @param {title, children} props
 * @returns {React.ReactElement}
 */
const AuthLayout = (props) => {
  const { title, children } = props;

  // redux
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <BaseLayout>
      <Head>
        <title>{title}</title>
      </Head>

      <Box sx={{ width: "100%" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            ml: { lg: `${sidebar.width}px`, xs: 0 },
            px: 1,
            py: 4,
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>

        <SettingsModal />
      </Box>
    </BaseLayout>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

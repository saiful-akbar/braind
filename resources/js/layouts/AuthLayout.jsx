import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "./BaseLayout";
import { Head } from "@inertiajs/react";
import { Box, Container } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import SettingsModal from "@/components/Modals/SettingsModal";
import Notification from "@/components/Notification";
import { openNotification, closeNotification } from "@/redux/reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";
import { usePage } from "@inertiajs/react";

/**
 * Auth layout
 *
 * @param {title, children} props
 * @returns {React.ReactElement}
 */
const AuthLayout = (props) => {
  const { title, children } = props;// redux
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const { flash } = usePage().props;

  /**
   * Tampilkan notifikasi jika ada flash message
   */
  React.useEffect(() => {
    const { status, message } = flash;
    
    if (status && message) {
      dispatch(
        openNotification({
          status, message,
        })
      );
    }
  }, [dispatch, flash]);

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
            px: 1,
            py: 4,
            ml: {
              lg: `${sidebar.width}px`,
              xs: 0,
            },
          }}
        >
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>

        <SettingsModal />
        <Notification />
      </Box>
    </BaseLayout>
  );
};

/**
 * Prop types
 */
AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;

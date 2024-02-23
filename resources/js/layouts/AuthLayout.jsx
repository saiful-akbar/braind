import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import Settings from "@/components/Settings";
import Sidebar from "@/components/Sidebar";
import { openNotification } from "@/redux/reducers/notificationReducer";
import { Head, usePage } from "@inertiajs/react";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "./BaseLayout";

/**
 * Auth layout
 *
 * @param {title, children} props
 * @returns {React.ReactElement}
 */
const AuthLayout = (props) => {
  const { title, children } = props;
  const sidebar = useSelector((state) => state.sidebar);
  const loading = useSelector((state) => state.loading);
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
          status,
          message,
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
          sx={{
            px: 1,
            pt: 3,
            pb: 5,
            ml: {
              lg: `${sidebar.width}px`,
              xs: 0,
            },
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>

        <Settings />
        <Notification />
        <Loader open={loading.open} />
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

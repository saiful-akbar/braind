import { closeNotification } from "@/redux/reducers/notificationReducer";
import MuiAlert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Alert
 */
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * Transisi
 *
 * @param {object} props
 * @returns React.ReactElement
 */
function Transition(props) {
  return <Grow {...props} />;
}

/**
 * Komponen notifikasi
 */
const Notification = () => {
  const dispatch = useDispatch();
  const { open, status, message, key } = useSelector(
    (state) => state.notification
  );

  /**
   * Fungsi close notifikasi
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      key={key}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      TransitionComponent={Transition}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={status}
        sx={{
          width: "100%",
          borderRadius: 2,
          color: "#fff",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
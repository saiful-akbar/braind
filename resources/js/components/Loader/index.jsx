import React from "react";
import PropTypes from "prop-types";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


/**
 * Komponen preloader
 */
const Loader = React.memo(({ open }) => {
	return (
		<Backdrop
      open={open}
      sx={{
      	color: "text.primary",
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        backgroundColor: (theme) => {
          if (theme.palette.mode === "dark") return "rgba(0, 0, 0, 0.7)";
          return "rgba(255, 255, 255, 0.7)";
        },
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
	);
});

/**
 * Prop types
 */
Loader.propTypes = {
	open: PropTypes.bool.isRequired,
};

export default Loader;

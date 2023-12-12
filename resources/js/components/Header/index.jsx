import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Komponen page header
 */
const Header = memo((props) => {
  const { title, action, children, ...rest } = props;

  // redux state & dispatch
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  // fungsi untuk menutup atau membuka mobile sidebar
  const toggleSidebar = () => {
    dispatch(openMobileSidebar(!sidebar.mobile.open));
  };

  return (
    <header>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          md={8}
          xs={7}
          zeroMinWidth
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="Buka menu" placement="right" disableInteractive>
            <IconButton
              onClick={toggleSidebar}
              sx={{
                backgroundColor: "background.paper",
                mr: 2,
                display: {
                  lg: "none",
                  xs: "flex",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="h6" component="h1" noWrap>
            {title}
          </Typography>
        </Grid>

        {action !== null && <Grid item>{action}</Grid>}
      </Grid>

      {children !== null && children}
    </header>
  );
});

/**
 * Prop types
 */
Header.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.element,
  children: PropTypes.node,
};

/**
 * default props
 */
Header.defaultProps = {
  action: null,
  children: null,
};

export default Header;
